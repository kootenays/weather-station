import { APIGatewayProxyHandlerV2WithJWTAuthorizer } from 'aws-lambda';
import { DevicesTable } from 'core/devices';

const DevicesClient = new DevicesTable();

/**
 * Get the list of all devices that exists in the database
 */
export const main: APIGatewayProxyHandlerV2WithJWTAuthorizer = async () => {
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
