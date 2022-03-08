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
}
