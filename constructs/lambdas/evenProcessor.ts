import { nodeJSFunctionProps } from '@constructs/lambda'
import { PersonSns } from '@constructs/sns'
import { snsProcessor } from '@functions/eventProcessor'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources'

/**
 * Unique interface used for delete person lambda
 */
export interface EventProcessorLambdaProps {
  /**
   * SQS queue to log delete event
   */
  topic: PersonSns
}

/**
 * Delete lambda function construct
 */
export class EventProcessorLambda extends NodejsFunction {
  constructor(scope: Construct, id: string, props: EventProcessorLambdaProps) {
    const { entry } = snsProcessor

    super(scope, id, {
      ...nodeJSFunctionProps,
      entry
    })

    const eventSource = new SnsEventSource(props.topic)

    this.addEventSource(eventSource)
    
  }
}