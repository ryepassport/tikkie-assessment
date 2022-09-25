import { Stack } from 'aws-cdk-lib'
import '@aws-cdk/assert/jest'

import { PersonStack, PersonStackProps } from '@lib/PersonStack'

describe('lib/PersonStack', () => {
  const buildProps = (): PersonStackProps => {
    return {
      queueName: 'test-queue',
      tableName: 'test-table',
      apiStageName: 'dev'
    }
  }

  const stack = new PersonStack(new Stack(), 'Stack', buildProps())

  it('should define a table', () => {
    expect(stack).toHaveResource('AWS::DynamoDB::Table', {
      TableName: 'test-table'
    })
  })

  it('should define an apiGateway', () => {
    expect(stack).toHaveResource('AWS::ApiGateway::RestApi', {
      Name: 'PersonAPIGateway'
    })
  })

  it('should define an SQS queue', () => {
    expect(stack).toHaveResource('AWS::SQS::Queue', {
      QueueName: 'test-queue'
    })
  })

  it('should define lambda function', () => { 
    expect(stack).toHaveResource('AWS::Lambda::Function')
  })
})