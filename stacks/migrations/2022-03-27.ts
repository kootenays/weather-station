import type { Kysely, Sql } from 'kysely';
import { DEFAULT_USERS_TABLE_NAME } from '../../backend/core';
import { KyselyWithRaw } from './interfaces';

export async function up(db: KyselyWithRaw): Promise<void> {
  // Add AWS Thing References
  await db.schema
    .alterTable(DEFAULT_USERS_TABLE_NAME)
    .addColumn('subs', db.raw(`text[]`))
    .execute();
}

export async function down(db: KyselyWithRaw): Promise<void> {
  await db.schema
    .alterTable(DEFAULT_USERS_TABLE_NAME)
    .dropColumn('subs')
    .execute();
}
