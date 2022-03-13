import * as sst from '@serverless-stack/resources';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { ApiStack } from './api';
import { StaticStack } from './static';

export default function main(app: sst.App): void {
  app.setDefaultFunctionProps({
    srcPath: 'backend',
    runtime: lambda.Runtime.NODEJS_14_X,
  });

  const staticInfra = new StaticStack(app);

  new ApiStack(app, { rdsCluster: staticInfra.rdsCluster });
}
