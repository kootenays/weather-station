import {
  DEFAULT_DEVICES_TABLE_NAME,
  DEFAULT_SENSOR_DATA_TABLE_NAME,
  DEFAULT_USERS_TABLE_NAME,
} from '../../backend';
import { createBaseTable } from './helpers';
import { KyselyWithRaw } from './interfaces';

export async function up(db: KyselyWithRaw): Promise<void> {
  // Add the postgis extension so we can use Point DataType and do geoqueries
  await db
    .raw('CREATE EXTENSION IF NOT EXISTS postgis')
    .execute(undefined as any);
  await db
    .raw('CREATE EXTENSION IF NOT EXISTS pgcrypto')
    .execute(undefined as any);

  // Create the users table
  await createBaseTable(db, DEFAULT_USERS_TABLE_NAME)
    .addColumn('email', 'text', (col) => col.unique())
    .addColumn('first_name', 'text')
    .addColumn('last_name', 'text')
    .execute();

  // Insert default system user
  await db
    .raw(
      `INSERT INTO ${DEFAULT_USERS_TABLE_NAME}(email, first_name, last_name)
  VALUES('admin@townhub.ca', 'Admin', 'KLIC')`
    )
    .execute(undefined as any);

  // Create the devices table
  await createBaseTable(db, DEFAULT_DEVICES_TABLE_NAME)
    .addColumn('name', 'text')
    .addColumn('user_id', 'uuid', (col) =>
      col.references(`${DEFAULT_USERS_TABLE_NAME}.id`).notNull()
    )
    .addColumn('point', 'point' as any)
    .execute();

  // Create the sensor data table
  await createBaseTable(db, DEFAULT_SENSOR_DATA_TABLE_NAME)
    .addColumn('device_id', 'uuid', (col) =>
      col.references(`${DEFAULT_DEVICES_TABLE_NAME}.id`).notNull()
    )
    .addColumn('timestamp', 'timestamptz')
    .addColumn('humidity', 'integer')
    .addColumn('temperature', 'integer')
    .addColumn('barometric_pressure', 'integer')
    .addColumn('wind_speed', 'integer')
    .addColumn('wind_direction', 'integer')
    .addColumn('rainfall', 'integer')
    .addColumn('snowfall', 'integer')
    .addColumn('precipitation', 'integer')
    .execute();
}

export async function down(db: KyselyWithRaw): Promise<void> {
  // Drop all tables that were created
  await db.schema
    .dropTable(DEFAULT_SENSOR_DATA_TABLE_NAME)
    .ifExists()
    .execute();
  await db.schema.dropTable(DEFAULT_DEVICES_TABLE_NAME).ifExists().execute();
  await db.schema.dropTable(DEFAULT_USERS_TABLE_NAME).ifExists().execute();
  // Drop the Extensions
  await db.raw('DROP EXTENSION IF EXISTS pgcrypto').execute(undefined as any);
  await db.raw('DROP EXTENSION IF EXISTS postgis').execute(undefined as any);
}
