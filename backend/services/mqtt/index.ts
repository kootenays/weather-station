import { Handler } from 'aws-lambda';
import { DatabaseCreateInput } from 'core/base';
import { DevicesTable } from 'core/devices';
import { SensorData, SensorDataTable } from 'core/sensor-data';
import { sql } from 'kysely';
import { DateTime } from 'luxon';

type EventPayload = DatabaseCreateInput<SensorData>;

const DevicesClient = new DevicesTable();
const SensorDataClient = new SensorDataTable();

export const handler: Handler<EventPayload, void> = async (event) => {
  const device = await DevicesClient.get(event.device_id as string);

  // If it doesn't, then just ignore it and move on
  if (!device) {
    console.log(
      `Unable to find device with id ${event.device_id}. Ignoring sensor data.`
    );
    return;
  }

  console.log(`Inputting data for ${device.id}`);

  // Otherwise, input the data in
  await SensorDataClient.create(
    {
      ...event,
      device_id: sql`${device.id}::uuid`,
      timestamp: sql`${DateTime.fromMillis(event.timestamp as number, {
        zone: 'UTC',
      }).toISO()}::timestamptz`,
    },
    null
  );
};
