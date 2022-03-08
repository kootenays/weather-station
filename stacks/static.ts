import { LambdaFunctionAction } from '@aws-cdk/aws-iot-actions-alpha';
import { IotSql, TopicRule } from '@aws-cdk/aws-iot-alpha';
import {
  App,
  Function,
  RDS,
  Stack,
  StackProps,
} from '@serverless-stack/resources';
import { RemovalPolicy } from 'aws-cdk-lib';

const DATABASE_NAME = 'WeatherStationDatabase';

/**
 * The Static Stack is a stack that contains all static infrastructure that
 * generally speaking does not change often. For example, databases.
 */
export class StaticStack extends Stack {
  constructor(scope: App, props?: StackProps) {
    super(scope, 'StatickStack', props);

    const isProd = scope.stage === 'prod';

    /*************************************************************************
     * Database cluster
     *************************************************************************/
    const cluster = new RDS(this, 'RDSCluster', {
      engine: 'postgresql10.14',
      defaultDatabaseName: DATABASE_NAME,
      migrations: 'stacks/migrations/dist',
      rdsServerlessCluster: {
        // Unless it is in a production environment, always destroy it
        removalPolicy: isProd ? RemovalPolicy.SNAPSHOT : RemovalPolicy.DESTROY,
      },
    });

    /*************************************************************************
     * AWS IoT
     *************************************************************************/
    // Lambda function to handle any incoming message(s)
    const mqttHandlerFn = new Function(this, 'MQTTHandlerFn', {
      handler: 'services/mqtt/index.handler',
      environment: {
        DATABASE_NAME,
        DATABASE_CLUSTER_ARN: cluster.clusterArn,
        DATABASE_SECRET_ARN: cluster.secretArn,
      },
      permissions: [cluster],
    });

    // The topic rule to forward the MQTT data into the provided handler
    new TopicRule(this, 'DBInsertRule', {
      description: 'Insert sensor data into the database instance',
      sql: IotSql.fromStringAsVer20160323(
        "SELECT topic(2) as device_id, timestamp() as timestamp, * FROM 'device/+/data'"
      ),
      actions: [new LambdaFunctionAction(mqttHandlerFn)],
    });
  }
}
