import { UniquePersonStackProps } from '@lib/PersonStack'
import { StageRecord, Stages } from '@models/aws'

/**
 * Default region for deployment
 */
export const DEFAULT_REGION = 'ap-southeast-1'

/**
 * Table model for saving data
 */
export const TABLE = {
  pkPrefix: 'PERSON|',
  skPrefix: 'DATA'
}

/**
 * API Stages
 */
export const AWS_STAGES: StageRecord = {
  dev: {
    stage: 'dev',
    region: 'ap-southeast-1',
    account: '778018686861'
  },
  test: {
    stage: 'test',
    region: 'ap-southeast-1',
    account: '778018686861'
  },
  staging: {
    stage: 'staging',
    region: 'ap-southeast-1',
    account: '778018686861'
  },
  prod: {
    stage: 'prod',
    region: 'ap-southeast-1',
    account: '778018686861'
  }
}

/**
 * Used to deploy stack
 */
export const PERSON_STACK_PROPS: Stages<UniquePersonStackProps> = {
  dev: {
    apiStageName: 'dev',
    tableName: 'person-dev',
    queueName: 'persons-queue-dev'
  },
  test: {
    apiStageName: 'test',
    tableName: 'persons-test',
    queueName: 'persons-queue-test'
  },
  staging: {
    apiStageName: 'staging',
    tableName: 'persons-staging',
    queueName: 'persons-queue-staging'
  },
  prod: {
    apiStageName: 'prod',
    tableName: 'persons-prod',
    queueName: 'persons-queue-prod'
  }
}
