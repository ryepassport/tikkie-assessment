import { QUEUE } from '@constants/aws';
import { APIGateway } from '@constructs/apiGateway'
import { DeletePersonLambda } from '@constructs/lambdas/deletePerson';
import { GetPersonLambda } from '@constructs/lambdas/getPerson';
import { SavePersonLambda } from '@constructs/lambdas/savePerson';
import { PersonEventQueue } from '@constructs/sqs';
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
  /**
   * Name of queue for each lambda events occurred
   */
  queueName: string
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
  
    const table = new PersonTable(this, 'PersonTable', {
      tableName: props.tableName
    })

    const apiGateway = new APIGateway(this, 'PersonAPIGateway', {
      stage: props.apiStageName
    })

    const personEventQueue = new PersonEventQueue(this, 'PersonEventQueue', {
      queueName: QUEUE.name
    })

    new SavePersonLambda(this, 'SavePersonLambda', {
      table,
      apiGateway,
      requestType: 'SAVE',
      queue: {
        url: personEventQueue.queueUrl,
        arn: personEventQueue.queueArn
      }
    })

    new SavePersonLambda(this, 'UpdatePersonLambda', {
      table,
      apiGateway,
      requestType: 'UPDATE',
      queue: {
        url: personEventQueue.queueUrl,
        arn: personEventQueue.queueArn
      }
    })
    
    new DeletePersonLambda(this, 'DeletePersonLambda', {
      table,
      apiGateway,
      queue: {
        url: personEventQueue.queueUrl,
        arn: personEventQueue.queueArn
      }
    })
    new GetPersonLambda(this, 'GetPersonLambda', { table, apiGateway, requestType: 'GET' })
    new GetPersonLambda(this, 'ListPersonLambda', { table, apiGateway, requestType: 'LIST' })
  }
}
