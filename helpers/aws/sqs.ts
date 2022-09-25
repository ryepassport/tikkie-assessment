// istanbul ignore file

import SQS from 'aws-sdk/clients/sqs'
import { DEFAULT_REGION } from '@bin/util'
import { captureAWSClient } from 'aws-xray-sdk'

const client = new SQS({
  region: DEFAULT_REGION
})

captureAWSClient(client)

export const sendMessage = async (params: SQS.SendMessageRequest) => {
  return client.sendMessage(params).promise()
}
