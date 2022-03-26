import { APIGatewayProxyHandlerV2WithJWTAuthorizer } from 'aws-lambda';
import { DevicesTable } from 'core/devices';

const DevicesClient = new DevicesTable();

// type JWTClaims = {
//   aud: string;
//   email: string;
//   email_verified: string;
//   exp: string;
//   iat: string;
//   iss: string;
//   name: string;
//   nickname: string;
//   nonce: string;
//   picture: string;
//   sub: string;
//   updated_at: string;
// };

/**
 * Get the list of all devices that exists in the database
 */
export const main: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (evt) => {
  console.log(evt);
  // const claims = evt.requestContext.authorizer.jwt.claims as JWTClaims;
  // Get list of all devices
  const devices = await DevicesClient.list();

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: devices,
      message: 'Devices listed successfully',
    }),
  };
};
