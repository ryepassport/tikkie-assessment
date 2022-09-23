import * as jsonHelper from '@helpers/json'

describe('helpers/json', () => {
  describe('safeParse', () => {
    it('should return parsed object if valid json is supplied', () => {
      const data = {
        id: 'test'
      }
      const output = jsonHelper.safeParse(JSON.stringify(data))
      
      expect(output).toEqual(data)
    })

    it('should return undefined if non-json data is supplied', () => {
      const output = jsonHelper.safeParse('abcd')

      expect(output).toBeUndefined()
    })
  })
})
