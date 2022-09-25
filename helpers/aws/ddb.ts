// istanbul ignore file

import { DEFAULT_REGION } from '@bin/util'
import DDB from 'aws-sdk/clients/dynamodb'
import { captureAWSClient } from 'aws-xray-sdk'

/**
 * An ugly fix to get X-ray to work with DocumentClient.
 * Only regular clients can be wrapped, so you have to inject
 * a regular client as tge service being used and then wrap that one.
 */
interface XrayClientFix extends DDB.DocumentClient {
  service: DDB
}

const client: XrayClientFix = new DDB.DocumentClient({
  region: DEFAULT_REGION,
  service: new DDB(),
  convertEmptyValues: true
}) as XrayClientFix

captureAWSClient(client.service)

export const get = async (params: DDB.DocumentClient.GetItemInput) => {
  return client.get(params).promise()
}

export const put = async (params: DDB.DocumentClient.PutItemInput) => {
  return client.put(params).promise()
}

export const update = async (params: DDB.DocumentClient.UpdateItemInput) => {
  return client.update(params).promise()
}

export const query = async (params: DDB.DocumentClient.QueryInput) => {
  return client.query(params).promise()
}

export const remove = (params: DDB.DocumentClient.DeleteItemInput) => {
  return client.delete(params).promise()
}

export const batchWrite = (params: DDB.DocumentClient.BatchWriteItemInput) => {
  return client.batchWrite(params).promise()
}

