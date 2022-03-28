import { Selectable, sql, Updateable } from 'kysely';
import { DatabaseTable } from '../base';
import { JWTClaim, User } from './interfaces';

export const DEFAULT_USERS_TABLE_NAME = 'users';

type Database = {
  [DEFAULT_USERS_TABLE_NAME]: User;
};

export class UsersTable extends DatabaseTable<
  Database,
  typeof DEFAULT_USERS_TABLE_NAME
> {
  constructor() {
    super(DEFAULT_USERS_TABLE_NAME);
  }

  async createFromJwtClaim(claim: JWTClaim, actorId: string | null) {
    return this.create(
      {
        email: claim.email,
        first_name: claim.name,
        last_name: '',
        subs: [claim.sub],
      },
      actorId
    );
  }

  /**
   * Get a user by their sub
   * @param sub The sub provided
   * @returns The user object
   */
  async getUserBySub(sub: string) {
    const res = await this.kysely
      .selectFrom(this.tableName)
      .selectAll()
      .where(sql`${sub}`, '=', sql`ANY (subs)`)
      .limit(1)
      .execute();

    return this.afterDBTransform(res[0]);
  }

  protected beforeDBTransform<TAfterItem extends Updateable<User>>(
    item: Selectable<User>
  ): TAfterItem {
    // If it has the subs array, then make sure it is set to use the way arrays
    // are written in sql
    if (item.subs && Array.isArray(item.subs)) {
      return {
        ...item,
        subs: sql`'{${item.subs.map((val) => `"${val}"`).join(',')}}'`,
      } as unknown as TAfterItem;
    }
    return item as TAfterItem;
  }

  protected afterDBTransform(databaseItem: Selectable<User>): Selectable<User> {
    // Kysely doesn't seem to handle arrays atm, so this is to transform the array
    // properly
    if (
      (databaseItem.subs as any).stringValues &&
      Array.isArray((databaseItem.subs as any).stringValues)
    ) {
      return { ...databaseItem, subs: (databaseItem.subs as any).stringValues };
    }
    return databaseItem;
  }
}
