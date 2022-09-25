#!/usr/bin/env node
import 'source-map-support/register'

import { App } from 'aws-cdk-lib'
import { PersonStack, UniquePersonStackProps } from '@lib/PersonStack'
import { Stage } from '@models/aws'
import { AWS_STAGES, PERSON_STACK_PROPS } from './util'

const app = new App()

Object.entries(PERSON_STACK_PROPS).forEach(([key, value]: [string, UniquePersonStackProps]) => {
  const defaultProps = AWS_STAGES[key as Stage]
  const { stage, account, region } = defaultProps

  new PersonStack(app, `person-${stage}`, {
    stackName: `person-infra`,
    description: 'Infrastructure stack for Persons API',
    env: {
      account,
      region
    },
    ...value
  })
})
