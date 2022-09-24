import { MessageDetails, MessageEventType } from '@models/queue'
import { sendMessage } from './aws/sqs'
import { getISODate } from './date'

/**
 * Send event message to sqs queue
 * @param data
 * Passed data to event
 * @param eventType
 * Action type for the event
 */
export const addEvent = async <T>(data: T, eventType: MessageEventType): Promise<void> => {
  const message: MessageDetails<T> = {
    type: eventType,
    data,
    created: getISODate()
  }
  
  await sendMessage({
    DelaySeconds: 5,
    MessageBody: JSON.stringify(message),
    QueueUrl: process.env.EVENT_QUEUE_URL as string
  })
}