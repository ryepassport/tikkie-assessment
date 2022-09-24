// istanbul ignore

import SQS from 'aws-sdk/clients/sqs'
import { config } from '@bin/config'
import { captureAWSClient } from 'aws-xray-sdk'

const client = new SQS({
  region: config.region
})

captureAWSClient(client)

export const sendMessage = async (params: SQS.SendMessageRequest): Promise<SQS.SendMessageResult> => {
  return client.sendMessage(params).promise()
}