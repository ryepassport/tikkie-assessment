import { LambdaBaseProps, nodeJSFunctionProps } from '@constructs/lambda'
import { saveRequest, updateRequest } from '@functions/savePerson'
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
  requestType: SavePersonRequestType
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

    props.apiGateway.addLambdaIntegration(this, apiGatewayIntegration)
  }
}