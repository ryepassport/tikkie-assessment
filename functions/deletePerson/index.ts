import { join } from 'path'
import { RequestTypeSchema, REQUEST_METHOD } from '@helpers/request'

/**
 * Delete request
 */
export const deletePerson: RequestTypeSchema = {
  entry: join(__dirname, 'handler.ts'),
  path: '/person/{id}',
  method: REQUEST_METHOD.DELETE
}