import * as publishMessageHelper from '@helpers/publishMessage'
import * as snsHelper from '@helpers/aws/sns'
import { MessageDetails, MessageEventType } from '@models/queue'
import { getISODate } from '@helpers/date'


jest.mock('@helpers/aws/sns')

interface BananaMessage {
  message: string
}

describe('helpers/event', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('should post a new message in the sqs queue', async () => {
    const publishMessageMock = jest.spyOn(snsHelper, 'publish').mockImplementationOnce(
      jest.fn()
    )
    
    const message: MessageDetails<BananaMessage> = {
      type: MessageEventType.CREATED,
      data: {
        message: 'banana'
      },
      created: getISODate()
    }

    await publishMessageHelper.publishMessage(message, MessageEventType.CREATED)

    expect(publishMessageMock).toHaveBeenCalled()

  })
})