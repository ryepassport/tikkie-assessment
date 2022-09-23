import { RequestValidationResult } from '@helpers/joi'
import * as Joi from 'joi'

describe('helpers/joi', () => {
  const testSchema = Joi.object({
    foo: Joi.string().required(),
    bar: Joi.number().required()
  })

  describe('getErrors', () => {
    it('should return array of errors', () => {
      const validation = testSchema.validate({ foo: '' })
      const result = new RequestValidationResult(validation)
      const errors = result.errors
      expect(errors.length).toBeGreaterThan(0)
    })
  })

  describe('getValue', () => {
    it('should return validated value', () => {
      const data = { foo: 'test', bar: 3 }
      const validation = testSchema.validate(data)
      const result = new RequestValidationResult(validation)
      const value = result.value
      expect(value).toEqual(data)
    })
  })
})