import { ColumnType, Generated, Insertable } from 'kysely';
import { DateTime } from 'luxon';

export type BaseEntity = {
  /** The id of this entity, should be a v4 UUID */
  id: Generated<string>;
  /** The time this entity was created */
  created_at: ColumnType<DateTime, never, never>;
  /** The person who created the entity */
  created_by: ColumnType<string, string | undefined, never>;
  /** The time this entity was updated */
  updated_at: ColumnType<DateTime, string | undefined, string>;
  /** The person who updated the entity */
  updated_by: ColumnType<string, string | undefined, string>;
};

export type OmitAuditFields<TItem = BaseEntity> = Omit<
  TItem,
  'created_at' | 'updated_at' | 'created_by' | 'updated_by'
>;
export type OmitId<TItem> = Omit<TItem, 'id'>;

export type DatabaseCreateInput<TItem> = OmitAuditFields<Insertable<TItem>>;
export type DatabaseUpdateInput<TItem> = Partial<TItem>;
