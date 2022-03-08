import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const main: APIGatewayProxyHandlerV2 = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'test public',
    }),
  };
};