// istanbul ignore file

import SNS from 'aws-sdk/clients/sns'
import { DEFAULT_REGION } from '@bin/util'
import { captureAWSClient } from 'aws-xray-sdk'

const client = new SNS({
  region: DEFAULT_REGION
})

captureAWSClient(client)

export const publish = async (params: SNS.PublishInput) => {
  return await client.publish(params).promise()
}
