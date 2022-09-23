/**
 * Common request method used for API requests
 */
export enum REQUEST_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/**
 * Structure interface for lambda function
 */
export interface RequestTypeSchema {
  /**
   * Entry point file for request handler
   */
  entry: string
  /**
   * Request URI path
   */
  path: string
  /**
   * See interface definition
   */
  method: REQUEST_METHOD
}