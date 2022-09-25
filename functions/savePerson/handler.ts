import { created, serverError } from '@helpers/handler'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { validateRequest } from './requestModel'
import { save } from './save'

/**
 * Save person handler
 * @param event
 * APIGatewayProxy Event, see interface definition
 * @returns
 * APIGatewayProxyResult, see interface definition
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id
    const body = event.body as string
    const data = validateRequest(body)

    const res = await save({
      data,
      id
    })

    return created(res)
  } catch (err) {
    return serverError(err as Error)
  }
}