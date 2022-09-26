import { MessageDetails, MessageEventType } from '@models/queue'
import { publish } from './aws/sns'
import { getISODate } from './date'

/**
 * Publish message to a certain topic
 * @param data
 * See interface definition
 * @param eventType 
 */
export const publishMessage = async <T>(data: T, eventType: MessageEventType): Promise<void> => {
  const message: MessageDetails<T> = {
    type: eventType,
    data,
    created: getISODate()
  }

  await publish({
    TopicArn: process.env.SNS_ARN,
    Message: JSON.stringify(message),
    Subject: 'PersonEvent'
  })
}