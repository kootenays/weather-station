import { HttpJwtAuthorizer } from '@aws-cdk/aws-apigatewayv2-authorizers-alpha';
import {
  Api,
  ApiAuthorizationType,
  App,
  RDS,
  Stack,
  StackProps,
} from '@serverless-stack/resources';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { isProd } from './helpers';
import { DATABASE_NAME } from './static';

type ApiStackProps = StackProps & {
  rdsCluster: RDS;
};

const ROOT_DOMAIN_NAME = process.env.ROOT_DOMAIN_NAME || '';

/**
 * The Api Stack is a stack that contains all of the API Gateway endpoints and
 * the handler functions behind it.
 *
 * @todo
 * Add Authentication
 * Create the endpoints
 * - Create a device
 * - Update a device's properties
 * - Delete a device
 * - Get/Create device certificate(s)
 * - Search sensor data for device (within a certain timeframe)
 * - Search for devices (within a certain geometry)
 *
 */
export class ApiStack extends Stack {
  constructor(scope: App, { rdsCluster, ...props }: ApiStackProps) {
    super(scope, 'ApiStack', props);

    // Create the API Gateway
    const api = new Api(this, 'Api', {
      // We don't need to retain access logs further than a day in dev
      accessLog: {
        retention: isProd(scope)
          ? RetentionDays.ONE_WEEK
          : RetentionDays.ONE_DAY,
      },
      // Setup the custom domain
      customDomain: {
        domainName: `api.${ROOT_DOMAIN_NAME}`,
        hostedZone: ROOT_DOMAIN_NAME,
      },
      // By default we always require authentication using JWT from Auth0
      defaultAuthorizationType: ApiAuthorizationType.JWT,
      defaultAuthorizer: new HttpJwtAuthorizer(
        'Auth0Authorizer',
        'https://myorg.us.auth0.com',
        { jwtAudience: ['replace-with-client-id'] }
      ),
      // The default is to provide access to our database. So make sure that
      // this is removed for any functions that do not require access.
      defaultFunctionProps: {
        environment: {
          DATABASE_NAME,
          DATABASE_CLUSTER_ARN: rdsCluster.clusterArn,
          DATABASE_SECRET_ARN: rdsCluster.secretArn,
        },
        permissions: [rdsCluster],
      },
    });

    api.addRoutes(this, {
      'POST /devices': {
        function: {
          handler: 'services/devices/create.main',
          permissions: ['iot:CreateThing'],
        },
        authorizationType: ApiAuthorizationType.NONE,
      },
      // Create a certificate for a device
      'POST /devices/{device_id}/certificates': {
        function: {
          handler: 'services/devices/create-certificate.main',
          permissions: [
            'iot:AttachPolicy',
            'iot:AttachThingPrincipal',
            'iot:CreateKeysAndCertificate',
            'iot:CreatePolicy',
          ],
        },
        authorizationType: ApiAuthorizationType.NONE,
      },
      // Example for a public endpoint that does not require authentication
      'GET /devices/{device_id}/data': {
        function: { handler: 'services/devices/data.main' },
        authorizationType: ApiAuthorizationType.NONE,
      },
    });
  }
}
