import { APIGateway } from '@constructs/api-gateway'
import { PersonTable } from '@constructs/table'
import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs';

/**
 * Unique props for Person Stack
 */
export interface UniquePersonStackProps {
  /**
   * Stage name for api gateway used for person api
   */
  apiStageName: string
  /**
   * Name of table used for Person stack
   */
  tableName: string
}

/**
 * Person stack type used for the stack definition
 */
export interface PersonStackProps extends StackProps, UniquePersonStackProps { }

/**
 * Main person api infrastructure stack
 */
export class PersonStack extends Stack {
  constructor(scope: Construct, id: string, props: PersonStackProps) {
    super(scope, id, props)
  
    new PersonTable(this, 'PersonTable', {
      tableName: props.tableName
    })

    new APIGateway(this, 'PersonAPIGateway', {
      stage: props.apiStageName
    })
  }
}
