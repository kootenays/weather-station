import { LambdaFunctionAction } from '@aws-cdk/aws-iot-actions-alpha';
import { IotSql, TopicRule } from '@aws-cdk/aws-iot-alpha';
import {
  App,
  Function,
  RDS,
  ReactStaticSite,
  Stack,
  StackProps,
} from '@serverless-stack/resources';
import { RemovalPolicy } from 'aws-cdk-lib';
import { isProd } from './helpers';

export const DATABASE_NAME = 'WeatherStationDatabase';

/**
 * The Static Stack is a stack that contains all static infrastructure that
 * generally speaking does not change often. For example, databases.
 */
export class StaticStack extends Stack {
  /** The RDS PostgresSQL Database Cluster */
  public readonly rdsCluster: RDS;

  constructor(scope: App, props?: StackProps) {
    super(scope, 'StatickStack', props);

    /*************************************************************************
     * Database cluster
     *************************************************************************/
    this.rdsCluster = new RDS(this, 'RDSCluster', {
      engine: 'postgresql10.14',
      defaultDatabaseName: DATABASE_NAME,
      migrations: 'stacks/migrations/dist',
      rdsServerlessCluster: {
        // Unless it is in a production environment, always destroy it
        removalPolicy: isProd(scope)
          ? RemovalPolicy.SNAPSHOT
          : RemovalPolicy.DESTROY,
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
        DATABASE_CLUSTER_ARN: this.rdsCluster.clusterArn,
        DATABASE_SECRET_ARN: this.rdsCluster.secretArn,
      },
      permissions: [this.rdsCluster],
    });

    // The topic rule to forward the MQTT data into the provided handler
    new TopicRule(this, 'DBInsertRule', {
      description: 'Insert sensor data into the database instance',
      sql: IotSql.fromStringAsVer20160323(
        "SELECT topic(2) as device_id, timestamp() as timestamp, * FROM 'devices/+/data'"
      ),
      actions: [new LambdaFunctionAction(mqttHandlerFn)],
    });

    /*************************************************************************
     * React Frontend
     *************************************************************************/
    const ROOT_DOMAIN_NAME = process.env.ROOT_DOMAIN_NAME ?? '';
    const AUTH0_DOMAIN = (process.env.AUTH0_JWT_ISSUER ?? 'https:///').split(
      '/'
    )[2];
    new ReactStaticSite(this, 'ReactWebApp', {
      path: 'frontend/web',
      customDomain: ROOT_DOMAIN_NAME,
      environment: {
        REACT_APP_AUTH0_DOMAIN: AUTH0_DOMAIN,
        REACT_APP_AUTH0_CLIENT_ID: process.env.AUTH0_JWT_AUDIENCE ?? '',
        REACT_APP_API_ENDPOINT: `api.${ROOT_DOMAIN_NAME}`,
      },
    });
  }
}
