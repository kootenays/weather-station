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

    const cluster = new RDS(this, 'RDSCluster', {
      engine: 'postgresql10.14',
      defaultDatabaseName: DATABASE_NAME,
      migrations: 'stacks/migrations/dist',
      rdsServerlessCluster: {
        // TODO: In dev, just remove it, but in production we can save the snapshot...
        // removalPolicy: isDev ? RemovalPolicy.DESTROY : RemovalPolicy.SNAPSHOT
      },
    });
  }
}
