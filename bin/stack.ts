#!/usr/bin/env node
import 'source-map-support/register'

import { App } from 'aws-cdk-lib'
import { PersonStack } from '@lib/PersonStack'
import { config } from './config'
import { TABLE } from '@constants/aws'

const app = new App()

new PersonStack(app, 'person-infra-app', {
  stackName: 'person-infra',
  env: {
    account: config.account,
    region: config.region
  },
  apiStageName: 'dev',
  tableName: TABLE.name
})
