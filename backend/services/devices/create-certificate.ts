import { APIGatewayProxyHandlerV2WithJWTAuthorizer } from 'aws-lambda';
import { DevicesTable } from 'core/devices';
import { Iot, AWSError } from 'aws-sdk';

const DevicesClient = new DevicesTable();
const IotClient = new Iot();

const AWS_REGION = process.env.AWS_REGION;

/**
 * Create the security certificates for a particular device. This will create
 * the certificate as well as an access policy and attach both of those to a
 * Thing in AWS IOT.
 */
export const main: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (
  event,
  context
) => {
  const deviceId = event.pathParameters?.['device_id'];
  // If deviceId was not specifed, then throw an error
  if (!deviceId)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'No deviceId specified',
      }),
    };

  const device = await DevicesClient.get(deviceId);
  // If a device with that id does not exist in the database, then move on
  if (!device)
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'No device with that id found',
      }),
    };

  if (!device.aws_thing_arn || !device.aws_thing_id) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'This device does not exist in AWS IoT',
      }),
    };
  }

  // Create the certificate
  const certificate = await IotClient.createKeysAndCertificate({
    setAsActive: true,
  }).promise();

  // Attach the certificate
  await IotClient.attachThingPrincipal({
    principal: certificate.certificateArn ?? '',
    thingName: device.id,
  }).promise();

  // Get the AWS ACCOUNT ID from the context so it will only create it in the
  // same account as one that invoked this Lambda Function.
  const AWS_ACCOUNT_ID = context.invokedFunctionArn.split(':')[4];

  let policyName: string;
  try {
    // Create the Access Policy to allow a device to connect, subscribe, receive
    // and publish data from a defined topic `devices/${device_id}/data`.
    const policy = await IotClient.createPolicy({
      policyName: `policy-${device.id}`,
      policyDocument: `{
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": "iot:Connect",
            "Resource": "arn:aws:iot:${AWS_REGION}:${AWS_ACCOUNT_ID}:client/${device.id}"
          },
          {
            "Effect": "Allow",
            "Action": "iot:Subscribe",
            "Resource": "arn:aws:iot:${AWS_REGION}:${AWS_ACCOUNT_ID}:topicfilter/devices/${device.id}/data"
          },
          {
            "Effect": "Allow",
            "Action": "iot:Receive",
            "Resource": "arn:aws:iot:${AWS_REGION}:${AWS_ACCOUNT_ID}:topic/devices/${device.id}/data"
          },
          {
            "Effect": "Allow",
            "Action": "iot:Publish",
            "Resource": "arn:aws:iot:${AWS_REGION}:${AWS_ACCOUNT_ID}:topic/devices/${device.id}/data"
          }
        ]
      }`,
    }).promise();
    policyName = policy.policyName ?? '';
  } catch (error) {
    // If a policy with the same name already exists, then just use the same
    // one, instead of creating a new one.
    if ((error as AWSError).code === 'ResourceAlreadyExistsException') {
      policyName = `policy-${device.id}`;
    } else {
      // Otherwise return as an error
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: (error as AWSError).message,
        }),
      };
    }
  }

  // Attach that policy to the certificate
  await IotClient.attachPolicy({
    policyName: policyName ?? '',
    target: certificate.certificateArn ?? '',
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Certificates created for Device',
      // Return the certificates. This is the only time we provide the private
      // and public key, so if it wasn't saved at this time, then they will
      // need to generate a new one.
      data: {
        pem: certificate.certificatePem,
        privateKey: certificate.keyPair?.PrivateKey,
        publicKey: certificate.keyPair?.PublicKey,
      },
    }),
  };
};
