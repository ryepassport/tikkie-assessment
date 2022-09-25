import { LambdaBaseProps, nodeJSFunctionProps } from '@constructs/lambda'
import { all, individual } from '@functions/getPerson'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'

/**
 * Request type for fetching data
 */
export type GetPersonRequestType = 'LIST' | 'GET'

/**
 * Unique interface used for fetching persons lambda
 */
export interface GetPersonProps extends LambdaBaseProps {
  /**
   * See interface definition
   */
  requestType: GetPersonRequestType
}

/**
 * Construct for get lambda function
 */
export class GetPersonLambda extends NodejsFunction {
  constructor(scope: Construct, id: string, props: GetPersonProps) {
    const { entry, ...apiGatewayIntegration } = props.requestType === 'LIST' ? all : individual

    super(scope, id, {
      ...nodeJSFunctionProps,
      entry
    })

    props.table.grant(this, 'dynamodb:Get*', 'dynamodb:Query')

    this.addEnvironment('TABLE_NAME', props.table.tableName)

    props.apiGateway.addLambdaIntegration(this, apiGatewayIntegration)
  }
}