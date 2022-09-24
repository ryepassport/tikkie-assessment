import { LambdaBaseProps, nodeJSFunctionProps } from '@constructs/lambda';
import { deletePerson } from '@functions/deletePerson';
import { QueueDetails } from '@models/queue';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs';

/**
 * Unique interface used for delete person lambda
 */
export interface DeletePersonProps extends LambdaBaseProps {
  /**
   * SQS queue to log delete event
   */
  queue: QueueDetails
}

/**
 * Delete lambda function construct
 */
export class DeletePersonLambda extends NodejsFunction {
  constructor(scope: Construct, id: string, props: DeletePersonProps) {
    const { entry, ...apiGatewayIntegration } = deletePerson

    super(scope, id, {
      ...nodeJSFunctionProps,
      entry
    })

    props.table.grant(this, 'dynamodb:Query', 'dynamodb:BatchWrite*')

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