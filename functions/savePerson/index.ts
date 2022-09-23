import { join } from 'path'
import { RequestTypeSchema, REQUEST_METHOD } from '@helpers/request'

/**
 * Update request interface schema
 */
export const updateRequest: RequestTypeSchema = {
  entry: join(__dirname, 'handler.ts'),
  path: '/person/{id}',
  method: REQUEST_METHOD.PUT
}

/**
 * Save request interface schema
 */
export const saveRequest: RequestTypeSchema = {
  entry: join(__dirname, 'handler.ts'),
  path: '/person',
  method: REQUEST_METHOD.POST
}