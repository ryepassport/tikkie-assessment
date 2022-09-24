// istanbul ignore file

import SQS from 'aws-sdk/clients/sqs'
import { config } from '@bin/config'
import { captureAWSClient } from 'aws-xray-sdk'

const client = new SQS({
  region: config.region
})

captureAWSClient(client)

export const sendMessage = async (params: SQS.SendMessageRequest) => {
  return client.sendMessage(params).promise()
}
