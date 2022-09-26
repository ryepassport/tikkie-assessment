import { SNSEvent } from 'aws-lambda'

/**
 * Lambda handler for sns topic
 * @param event
 * See interface definition
 */
export const handler = async (event: SNSEvent): Promise<void> => {
  event.Records.forEach(record => {
    console.log('Record ', record)
  })
}
