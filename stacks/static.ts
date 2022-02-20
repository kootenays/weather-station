import {
  App,
  Stack,
  StackProps,
  Table,
  TableFieldType,
} from '@serverless-stack/resources';

/**
 * The Static Stack is a stack that contains all static infrastructure that
 * generally speaking does not change often. For example, databases.
 */
export class StaticStack extends Stack {
  constructor(scope: App, props?: StackProps) {
    super(scope, 'StatickStack', props);

    /**
     * Devices Table is used to keep track of all devices that have access and
     * is sending data to our MQTT Server.
     */
    new Table(this, 'DevicesTable', {
      fields: {
        id: TableFieldType.STRING,
        userId: TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: 'id', sortKey: 'userId' },
    });

    /**
     * SensorsData Table is used to save all of the sensor data that is sent to
     * the server.
     */
    new Table(this, 'SensorsDataTable', {
      fields: {
        /** The id of the device as specified in the DevicesTable */
        deviceId: TableFieldType.STRING,
        /**
         * The accessKey is used to easily find some data for each device. It is
         * formatted as such: `[KEYWORD]#[ISO DATETIME]`. Or for example:
         *  - LATEST#
         *  - DATA#2022-02-20T22:30:00+00:00
         *  - DAILYSUMMARY#2022-02-20
         *
         * This should allow us to easily find and get the values really quickly.
         */
        accessKey: TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: 'deviceId', sortKey: 'accessKey' },
    });
  }
}
