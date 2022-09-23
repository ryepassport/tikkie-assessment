import { ok, serverError } from '@helpers/handler'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { remove } from './delete'

/**
 * Delete lambda handler
 * @param event
 * See interface definition
 * @returns
 * See interface definition
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id as string

    await remove(id)
    return ok('Person successfully deleted')
  } catch (err) {
    return serverError(err as Error)
  }
}
