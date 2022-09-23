import { LambdaBaseProps, nodeJSFunctionProps } from '@constructs/lambda';
import { deletePerson } from '@functions/deletePerson';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs';

/**
 * Unique interface used for delete person lambda
 */
export interface DeletePersonProps extends LambdaBaseProps {}

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

    props.apiGateway.addLambdaIntegration(this, apiGatewayIntegration)
  }
}