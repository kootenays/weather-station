import * as sst from '@serverless-stack/resources';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { StaticStack } from './static';

export default function main(app: sst.App): void {
  app.setDefaultFunctionProps({
    srcPath: 'backend',
    runtime: lambda.Runtime.NODEJS_14_X,
  });

  new StaticStack(app);
}
