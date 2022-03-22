import { DEFAULT_USERS_TABLE_NAME } from '../../backend/core';
import { KyselyWithRaw } from './interfaces';

/**
 * A helper to add the default audit columns to the database table
 */
export const createBaseTable = (db: KyselyWithRaw, tableName: string) => {
  return db.schema
    .createTable(tableName)
    .ifNotExists()
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(db.raw('gen_random_uuid()'))
    )
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(db.raw('NOW()')).notNull()
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.defaultTo(db.raw('NOW()')).notNull()
    )
    .addColumn('created_by', 'uuid', (col) =>
      col.references(`${DEFAULT_USERS_TABLE_NAME}.id`)
    )
    .addColumn('updated_by', 'uuid', (col) =>
      col.references(`${DEFAULT_USERS_TABLE_NAME}.id`)
    );
};
