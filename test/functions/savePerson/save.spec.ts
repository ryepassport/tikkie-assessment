import * as savePerson from '@functions/savePerson/save'
import * as personStorageHelper from '@helpers/storage/person'
import * as eventHelper from '@helpers/event'
import { Person } from '@models/person'

jest.mock('@helpers/storage/person')
jest.mock('@helpers/event')

describe('functions/savePerson', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  describe('save', () => {
    const person: Person = {
      id: 'abc123',
      firstName: 'Jon',
      lastName: 'Snow',
      phone: '12345',
      address: '12345'
    }

    it('should save a new record', async () => {
      const savePersonMock = jest.spyOn(personStorageHelper, 'savePerson').mockResolvedValue(person)
      const addEventMock = jest.spyOn(eventHelper, 'addEvent').mockResolvedValue()
      
      const output = await savePerson.save({
        data: {} as unknown as Person
      })

      expect(output).toEqual(person)
      expect(savePersonMock).toBeCalled()
      expect(addEventMock).toBeCalled()
    })

    it('should update a record', async () => {
      const updatePersonMock = jest.spyOn(personStorageHelper, 'updatePerson').mockResolvedValue(person)
      const addEventMock = jest.spyOn(eventHelper, 'addEvent').mockResolvedValue()

      const output = await savePerson.save({
        data: {} as unknown as Person,
        id: 'abc123'
      })

      expect(output).toEqual(person)
      expect(updatePersonMock).toBeCalled()
      expect(addEventMock).toBeCalled()

    })

  })
})
