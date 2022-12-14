import * as eventHelper from '@helpers/event'
import * as sqsHelper from '@helpers/aws/sqs'
import { MessageDetails, MessageEventType } from '@models/queue'
import { getISODate } from '@helpers/date'


jest.mock('@helpers/aws/sqs')

interface BananaMessage {
  message: string
}

describe('helpers/event', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('should post a new message in the sqs queue', async () => {
    const sendMessageMock = jest.spyOn(sqsHelper, 'sendMessage').mockImplementationOnce(
      jest.fn()
    )
    
    const message: MessageDetails<BananaMessage> = {
      type: MessageEventType.CREATED,
      data: {
        message: 'banana'
      },
      created: getISODate()
    }

    await eventHelper.addEvent(message, MessageEventType.CREATED)

    expect(sendMessageMock).toHaveBeenCalled()

  })
})