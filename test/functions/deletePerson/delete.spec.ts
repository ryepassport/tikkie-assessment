import * as personStorageHelper from '@helpers/storage/person'
import * as eventHelper from '@helpers/event'
import * as deletePerson from '@functions/deletePerson/delete'
import * as publishMessageHelper from '@helpers/publishMessage'

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
      const publishMessageMock = jest.spyOn(publishMessageHelper, 'publishMessage').mockResolvedValue()


      await deletePerson.remove('banana')
      
      expect(deleteMock).toBeCalled()
      expect(addEventMock).toBeCalled()
      expect(publishMessageMock).toBeCalled()
    })
  })
})