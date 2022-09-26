import * as personStorageHelper from '@helpers/storage/person'
import * as getPerson from '@functions/getPerson/get'
import { Person } from '@models/person'

jest.mock('@helpers/storage/person')

describe('functions/getPerson', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  const person: Person = {
    id: 'abc123',
    firstName: 'Jon',
    lastName: 'Snow',
    phone: '12345',
    address: '12345',
    createdAt: 'date-here'
  }

  describe('get', () => {
    it('should return a data', async() => {
      const getPersonMock = jest.spyOn(personStorageHelper, 'getPerson').mockResolvedValue(person)

      const output = await getPerson.get('abc123')

      expect(output).toEqual(person)
      expect(getPersonMock).toBeCalled()
    })

    it('should return all data', async() => {
      const getPersonsMock = jest.spyOn(personStorageHelper, 'getPersons').mockResolvedValue([person])
      
      const output = await getPerson.get()

      expect(output).toEqual([person])
      expect(getPersonsMock).toBeCalled()
    })

    it('should return an undefined value when no record was found', async() => {
      jest.spyOn(personStorageHelper, 'getPerson').mockResolvedValue(undefined)

      const output = await getPerson.get('banana')

      expect(output).toBeUndefined()
    })

    it('should return an undefined value when no record was found', async() => {
      jest.spyOn(personStorageHelper, 'getPersons').mockResolvedValue([])

      const output = await getPerson.get()

      expect(output).toEqual([])
    })
  })
})
