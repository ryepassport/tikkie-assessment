import { RequestTypeSchema, REQUEST_METHOD } from '@helpers/request'
import { join } from 'path'

/**
 * Get request schema for fetching individual record
 */
export const individual: RequestTypeSchema = {
  entry: join(__dirname, 'handler.ts'),
  path: '/person/{id}',
  method: REQUEST_METHOD.GET,
}

/**
 * Get request schema for fetching all persons
 */
export const all: RequestTypeSchema = {
  entry: join(__dirname, 'handler.ts'),
  path: '/person',
  method: REQUEST_METHOD.GET,
}