import type { Kysely, Sql } from 'kysely';

const USERS_TABLE_NAME = 'users';
const DEVICES_TABLE_NAME = 'devices';
const SENSORS_DATA_TABLE_NAME = 'sensor_data';

// Not sure where this is coming from but @thdxr mentioned to use this instead of the
// sql import from Kysely
interface KyselyWithRaw extends Kysely<any> {
  raw: Sql['raw'];
}

export async function up(db: KyselyWithRaw): Promise<void> {
  await db.raw('CREATE EXTENSION postgis').execute(undefined as any);

  await db.schema
    .createTable(USERS_TABLE_NAME)
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable(DEVICES_TABLE_NAME)
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('userId', 'uuid', (col) =>
      col.references(`${USERS_TABLE_NAME}.id`).notNull()
    )
    .addColumn('location', 'point' as any)
    .execute();

  await db.schema
    .createTable(SENSORS_DATA_TABLE_NAME)
    .addColumn('deviceId', 'uuid', (col) =>
      col.references(`${DEVICES_TABLE_NAME}.id`).notNull()
    )
    .addColumn('timestamp', 'timestamptz')
    .addColumn('created_at', 'timestamptz')
    .addColumn('created_at', 'timestamptz')
    .execute();
}

export async function down(db: KyselyWithRaw): Promise<void> {
  await db.schema.dropTable(SENSORS_DATA_TABLE_NAME).execute();
  await db.schema.dropTable(DEVICES_TABLE_NAME).execute();
  await db.schema.dropTable(USERS_TABLE_NAME).execute();
  await db.raw('DROP EXTENSION postgis').execute(undefined as any);
}
