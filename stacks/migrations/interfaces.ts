// Not sure where this is coming from but @thdxr mentioned to use this instead of the

import { Kysely, Sql } from 'kysely';

// sql import from Kysely
export interface KyselyWithRaw extends Kysely<any> {
  raw: Sql['raw'];
}
