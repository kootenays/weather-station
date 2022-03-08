import { DatabaseTable } from '../base';
import { Device } from './interfaces';

export const DEFAULT_DEVICES_TABLE_NAME = 'devices';

type Database = {
  [DEFAULT_DEVICES_TABLE_NAME]: Device;
};

export class DevicesTable extends DatabaseTable<
  Database,
  typeof DEFAULT_DEVICES_TABLE_NAME
> {
  constructor() {
    super(DEFAULT_DEVICES_TABLE_NAME);
  }
}
