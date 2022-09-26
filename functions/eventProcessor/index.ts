import { join } from 'path'

/**
 * Get request schema for fetching all persons
 */
 export const snsProcessor = {
  entry: join(__dirname, 'handler.ts'),
}