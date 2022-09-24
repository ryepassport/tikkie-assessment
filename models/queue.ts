/**
 * Queue details for lambda requirements
 */
export interface QueueDetails {
  /**
   * Queue url
   */
  url: string
  /**
   * Queue arn
   */
  arn: string
}

/**
 * Event type transactions
 */
export enum MessageEventType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED'
}

/**
 * Message details
 */
export interface MessageDetails<T> {
  /**
   * Event type for the message
   */
  type: MessageEventType
  /**
   * Data passed to the queue
   */
  data: T
  /**
   * Date time string the message is created
   */
  created: string
}