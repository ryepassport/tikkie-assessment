import { Person } from '@models/person'
import { APIGatewayProxyResult } from 'aws-lambda'

/**
 * Type for response body
 */
export type ResponseBody = Person | Person[] | string

/**
 * Type for headers
 */
export type Headers = Record<string, string>

/**
 * Common status codes used as response
 */
export enum STATUS_CODE {
  OK = 200,
  NOT_FOUND = 404,
  CREATED = 201,
  INTERNAL_SERVER_ERROR = 500
}

/**
 * Default header for CORS allow all
 */
export const defaultHeaders = {
  'Access-Control-Allow-Origin': '*'
}

/**
 * Base for creating handler response
 * @param statusCode
 * Status code for the response
 * @param body 
 * Message body
 * @param headers 
 * Custom headers
 * @returns
 * APIGatewayResponse see interface
 */
export const buildHandlerResponse = (statusCode: STATUS_CODE, body: ResponseBody, headers?: Headers): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      ...defaultHeaders,
      ...headers
    }
  }
}

/**
 * Returns a successful response
 * @param body 
 * @param headers 
 * @returns 
 */
export const ok = (body: ResponseBody, headers?: Headers) => {
  return buildHandlerResponse(STATUS_CODE.OK, body, headers)
}

/**
 * 
 * @param body 
 * @param headers 
 * @returns 
 */
export const created = (body: ResponseBody, headers?: Headers) => {
  return buildHandlerResponse(STATUS_CODE.CREATED, body, headers)
}

/**
 * Returns an error for not found record
 * @param body 
 * @param headers 
 * @returns 
 */
export const notFoundError = (body: string, headers?: Headers) => {
  return buildHandlerResponse(STATUS_CODE.NOT_FOUND, body, headers)
}

/**
 * Returns internal server error
 * @param body 
 * @param headers 
 * @returns 
 */
export const serverError = (body: Error, headers?: Headers) => {
  const message = typeof body === 'string' ? body : body.message
  return buildHandlerResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, message, headers)
}