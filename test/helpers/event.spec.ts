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
    jest.resetAllMocks()
    jest.resetAllMocks()
  })

  it('should post a new message in the sqs queue', async () => {
    const mockSQSSendMessage = jest.fn()

    mockSQSSendMessage.mockImplementationOnce(() => {
      return {
        MD5OfMessageBody: "banana",
        MD5OfMessageAttributes: "banana",
        MessageId: "banana"
      }
    })

    const sendMessageMock = jest.spyOn(sqsHelper, 'sendMessage').mockImplementationOnce(mockSQSSendMessage)
    
    const message: MessageDetails<BananaMessage> = {
      type: MessageEventType.CREATED,
      data: {
        message: 'banana'
      },
      created: getISODate()
    }

    await eventHelper.addEvent(message, MessageEventType.CREATED)

    expect(sendMessageMock).toHaveBeenCalled();

  })
})