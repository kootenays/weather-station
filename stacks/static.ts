import { App, RDS, Stack, StackProps } from '@serverless-stack/resources';
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

    /**
     * Database cluster
     */
    const cluster = new RDS(this, 'RDSCluster', {
      engine: 'postgresql10.14',
      defaultDatabaseName: DATABASE_NAME,
      migrations: 'stacks/migrations/dist',
      rdsServerlessCluster: {
        // Unless it is in a production environment, always destroy it
        removalPolicy: isProd ? RemovalPolicy.SNAPSHOT : RemovalPolicy.DESTROY,
      },
    });

    /**
     * AWS IoT
     * TODO:
     * - Create a rule to forward to a Lambda function
     * - That Lambda function should receive the data and save it into Postgres
     */
  }
}
