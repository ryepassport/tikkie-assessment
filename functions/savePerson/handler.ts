import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

/**
 * Save person handler
 * @param event
 * APIGatewayProxy Event, see interface definition
 * @returns
 * APIGatewayProxyResult, see interface definition
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event)
  return {
    statusCode: 201,
    body: 'Hello',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}