import { RequestValidationResult } from '@helpers/joi'
import { safeParse } from '@helpers/json'
import { MaybeNull } from '@models/common'
import { Person } from '@models/person'
import * as Joi from 'joi'

/**
 * Request validation for adding/updating person request
 * @param data
 * String input from request body
 * @returns
 * An entity or an array of Person, see interface definition
 */
export const validateRequest = (data: MaybeNull<string>): Person => {
  if (!data) {
    throw new Error('Missing request body')
  }

  const parsed = safeParse(data)

  const schema: Joi.Schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required()
  })

  const result = new RequestValidationResult<Person>(schema.validate(parsed))

  if (result.errors.length) {
    throw new Error(result.errors.join(','))
  }

  return parsed
}
