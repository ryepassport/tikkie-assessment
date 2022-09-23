import { Duration } from 'aws-cdk-lib'
import { Architecture, LambdaInsightsVersion, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import { APIGateway } from './apiGateway'
import { PersonTable } from './table'

/**
 * Base props to pass to lambda construct
 */
export interface LambdaBaseProps {
  /**
   * API gateway where lambda is integrated
   */
  apiGateway: APIGateway
  /**
   * Storage for lambda
   */
  table: PersonTable
}

/**
 * Base props for nodejs function
 */
export const nodeJSFunctionProps: NodejsFunctionProps = {
  architecture: Architecture.ARM_64,
  memorySize: 1024,
  tracing: Tracing.ACTIVE,
  timeout: Duration.seconds(5),
  reservedConcurrentExecutions: 2,
  logRetention: RetentionDays.ONE_WEEK,
  insightsVersion: LambdaInsightsVersion.VERSION_1_0_119_0,
  runtime: Runtime.NODEJS_16_X,
  bundling: {
    minify: true,
    externalModules: [
      'aws-sdk'
    ]
  }
}
