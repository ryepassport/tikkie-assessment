import { Duration } from 'aws-cdk-lib'
import { Queue } from 'aws-cdk-lib/aws-sqs'
import { Construct } from 'constructs'

/**
 * Queue params
 */
export interface QueueProps {
  /**
   * Name of the queue
   */
  queueName: string
}

/**
 * Construct for the queue
 */
export class PersonEventQueue extends Queue {
  constructor(scope: Construct, id: string, props: QueueProps) {
    super(scope, id, {
      visibilityTimeout: Duration.seconds(30),
      queueName: props.queueName
    })
  }
}