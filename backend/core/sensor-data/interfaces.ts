import { ColumnType } from 'kysely';
import { BaseEntity } from '../base';

/** Sensor data should be able to be updated */
type Unupdateable<TValue = number> = ColumnType<TValue, TValue | null, null>;

export type SensorData = BaseEntity & {
  /** The device that provided this data */
  device_id: string;
  /** The timestamp that this sensor data is for */
  timestamp: string;
  /**
   * The humidity data recorded. In % so save it as 10 for 10%
   */
  humidity: Unupdateable;
  /**
   * The temperature data recorded. In mC so save it as 30000 for 30 deg Celcius
   */
  temperature: Unupdateable;
  /**
   * The pressure data recorded. In Pa, so save it as 102800 for 102.8 kPa
   */
  barometric_pressure: Unupdateable;
  /**
   * The recorded wind speed. In km/hr, so save it as 8 for 8km/hr
   */
  wind_speed: Unupdateable;
  /**
   * The recorded wind direction. In degrees, so save it as 90 for 90 deg (or
   * an east wind).
   */
  wind_direction: Unupdateable;
  /** The recorded rainfall. In mm, so save it as 100 for 100mm */
  rainfall: Unupdateable;
  /** The recorded snowfall. In mm, so save it as 100 for 10cm */
  snowfall: Unupdateable;
  /** The recorded precipitation. In mm, so save it as 100 for 100mm */
  precipitation: Unupdateable;
};
