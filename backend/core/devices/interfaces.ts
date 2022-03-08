import { BaseEntity } from '../base';

export type Device = BaseEntity & {
  /** A name provided by the user, e.g. Weather Station #1 */
  name: string;
  /** The owner of this device */
  user_id: string;
  /** The GPS location of this device */
  point: string | null;
  /** The elevation for this device */
  elevation: number | null;
};
