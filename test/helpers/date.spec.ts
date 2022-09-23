import * as dateHelper from '@helpers/date'

describe('helpers/date', () => {
  describe('getISODate', () => {
    it('should return current date if no parameter is supplied', () => {
      const output = dateHelper.getISODate()

      expect(output).toEqual(output)
    })

    it('should return ISO string for supplied parameter', () => {
      const output = dateHelper.getISODate('2021-09-21')

      expect(output).toEqual('2021-09-21T00:00:00.000Z')
    })
  })
})