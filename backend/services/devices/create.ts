import { APIGatewayProxyHandlerV2WithJWTAuthorizer } from 'aws-lambda';
import { Iot } from 'aws-sdk';
import { sql } from 'kysely';
import { DevicesTable } from 'core/devices';

const DevicesClient = new DevicesTable();
const IotClient = new Iot();

/**
 * Create a device in the database as well as a related AWS IoT Thing. If the
 * thing creation fails, it should then remove the database entry as well.
 */
export const main: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (evt) => {
  const body: { name?: string; user_id?: string } =
    (evt.body && JSON.parse(evt.body)) || {};

  if (!body.name || !body.user_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Unable to create without a name or user_id specified.',
      }),
    };
  }

  // Create a device in the database
  const device = await DevicesClient.create(
    {
      name: body.name,
      user_id: sql`${body.user_id}::uuid` as any as string,
    },
    null
  );

  try {
    // Create an AWS IoT Thing
    const thing = await IotClient.createThing({
      thingName: device.id,
    }).promise();

    // Update the device in the basement with the aws thing arn
    const latest = await DevicesClient.update(
      device.id,
      {
        aws_thing_arn: thing.thingArn ?? null,
        aws_thing_id: thing.thingId ?? null,
      },
      null
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Device successfully created',
        data: latest,
      }),
    };
  } catch (error) {
    // Something went wrong, so just delete the device that was created from
    // the database
    console.error(error);
    await DevicesClient.delete(device.id);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Something went wrong', error }),
    };
  }
};
