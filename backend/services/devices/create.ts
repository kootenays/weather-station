import { APIGatewayProxyHandlerV2WithJWTAuthorizer } from 'aws-lambda';

export const main: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (
  event,
  context
) => {
  // console.log(context)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'test',
    }),
  };
};
