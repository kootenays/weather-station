import { ColumnType, RawBuilder } from 'kysely';
import { BaseEntity } from '../base';

export type User = BaseEntity & {
  email: string;
  first_name: string;
  last_name: string;
  subs: ColumnType<string[], string[] | RawBuilder, string[] | RawBuilder>;
};

export type JWTClaim = {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  nonce: string;
};
