import { StackProps } from 'aws-cdk-lib'
import { LambdaIntegration, Method, MethodOptions, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Function } from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

/**
 * Unique props used only for API Gateway construct
 */
export interface UniqueAPIGatewayProps {
  /**
   * Stage name for api gateway stage
   */
  stage: string
}

/**
 * API Gateway props used for API gateway construct
 */
export interface APIGatewayProps extends StackProps, UniqueAPIGatewayProps {}

/**
 * Options used for lambda integration
 */
export interface LambdaIntegrationOption extends MethodOptions {
  /**
   * API gateway path
   */
  path: string
  /**
   * Method for the path
   */
  method: string
}

/**
 * API Gateway construct
 */
export class APIGateway extends RestApi {
  constructor(scope: Construct, id: string, props: APIGatewayProps) {
    super(scope, id, {
      deployOptions: {
        stageName: props.stage
      }
    })
  
    this.root.addMethod('ANY')
  }

  public addLambdaIntegration = (lambda: Function, options: LambdaIntegrationOption): Method => {
    const { path, method, ...methodOptions } = options

    const lambdaIntegration = new LambdaIntegration(lambda)

    const resource = this.root.resourceForPath(path)

    return resource.addMethod(method, lambdaIntegration, {
      ...methodOptions
    })
  }
}
