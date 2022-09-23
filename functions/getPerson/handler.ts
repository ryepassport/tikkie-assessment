import { notFoundError, ok, serverError } from '@helpers/handler'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { get } from './get'

/**
 * Lambda handler for fetching person data
 * @param event
 * See interface definition
 * @returns 
 * See interface definition
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id
    const person = await get(id)

    if (!person) {
      return notFoundError('Person not found!')
    }

    return ok(person)
  } catch (err) {
    return serverError(err as Error)
  }
}
