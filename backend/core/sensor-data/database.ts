import { sql } from 'kysely';
import { DatabaseTable } from '../base';
import { SensorData } from './interfaces';

export const DEFAULT_SENSOR_DATA_TABLE_NAME = 'sensor_data';

type Database = {
  [DEFAULT_SENSOR_DATA_TABLE_NAME]: SensorData;
};

export class SensorDataTable extends DatabaseTable<
  Database,
  typeof DEFAULT_SENSOR_DATA_TABLE_NAME
> {
  constructor() {
    super(DEFAULT_SENSOR_DATA_TABLE_NAME);
  }

  /**
   * List sensor data by the device id
   */
  async listByDeviceId(deviceId: string) {
    const res = await this.kysely
      .selectFrom(this.tableName)
      .selectAll()
      .where('device_id', '=', sql`${deviceId}::uuid`)
      .orderBy('timestamp', 'desc')
      .limit(25)
      .execute();

    return res.map(this.afterDBTransform);
  }
}
