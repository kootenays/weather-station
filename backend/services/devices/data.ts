import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { SensorDataTable } from 'core/sensor-data';

const SensorDataClient = new SensorDataTable();

export const main: APIGatewayProxyHandlerV2 = async (event, context) => {
  const deviceId = event.pathParameters?.device_id;

  if (!deviceId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message:
          'Please specify which device you would like to get the data for.',
      }),
    };
  }

  const data = await SensorDataClient.listByDeviceId(deviceId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Succesfully found sensor data',
      data,
    }),
  };
};
