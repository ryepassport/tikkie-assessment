import { LambdaBaseProps, nodeJSFunctionProps } from '@constructs/lambda'
import { saveRequest, updateRequest } from '@functions/savePerson'
import { QueueDetails } from '@models/queue'
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'

/**
 * Save person request type
 */
export type SavePersonRequestType = 'SAVE' | 'UPDATE'

/**
 * Prop type for saving a person data
 */
export interface SavePersonProps extends LambdaBaseProps {
  /**
   * Type of request
   */
  requestType: SavePersonRequestType,
  /**
   * Event queue details
   */
  queue?: QueueDetails
}

/**
 * Main construct for save lambda function
 */
export class SavePersonLambda extends NodejsFunction {
  constructor(scope: Construct, id: string, props: SavePersonProps) {
    const { entry, ...apiGatewayIntegration } = props.requestType === 'SAVE' ? saveRequest : updateRequest

    super(scope, id, {
      ...nodeJSFunctionProps,
      entry
    })

    const grantType = props.requestType === 'SAVE' ? 'dynamodb:PutItem' : 'dynamodb:Update*'
    props.table.grant(this, grantType)

    if (props.queue) {
      const { url, arn } = props.queue

      this.addEnvironment('EVENT_QUEUE_URL', url)

      const policyStatement = new PolicyStatement({
        effect: Effect.ALLOW,
        resources: [arn],
        actions: ['sqs:SendMessage']
      })

      this.addToRolePolicy(policyStatement)
    }

    props.apiGateway.addLambdaIntegration(this, apiGatewayIntegration)
  }
}