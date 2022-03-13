import type { Kysely, Sql } from 'kysely';
import { DEFAULT_DEVICES_TABLE_NAME } from '../../backend/core';
import { KyselyWithRaw } from './interfaces';

export async function up(db: KyselyWithRaw): Promise<void> {
  // Add AWS Thing References
  await db.schema
    .alterTable(DEFAULT_DEVICES_TABLE_NAME)
    .addColumn('aws_thing_arn', 'text')
    .execute();

  await db.schema
    .alterTable(DEFAULT_DEVICES_TABLE_NAME)
    .addColumn('aws_thing_id', 'text')
    .execute();
}

export async function down(db: KyselyWithRaw): Promise<void> {
  await db.schema
    .alterTable(DEFAULT_DEVICES_TABLE_NAME)
    .dropColumn('aws_thing_id')
    .execute();

  await db.schema
    .alterTable(DEFAULT_DEVICES_TABLE_NAME)
    .dropColumn('aws_thing_arn')
    .execute();
}
