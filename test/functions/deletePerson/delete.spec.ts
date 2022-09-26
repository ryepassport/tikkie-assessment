import * as personStorageHelper from '@helpers/storage/person'
import * as eventHelper from '@helpers/event'
import * as deletePerson from '@functions/deletePerson/delete'

jest.mock('@helpers/storage/person')
jest.mock('@helpers/event')

describe('functions/deletePerson', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  describe('delete', () => {
    it('should remove a record', async () => {
      const deleteMock = jest.spyOn(personStorageHelper, 'removePerson').mockResolvedValue()
      const addEventMock = jest.spyOn(eventHelper, 'addEvent').mockResolvedValue()

      await deletePerson.remove('banana')
      
      expect(deleteMock).toBeCalled()
      expect(addEventMock).toBeCalled()
    })
  })
})