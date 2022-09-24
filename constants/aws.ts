/**
 * AWS configuration settings
 */
 export const AWS_SETTINGS = {
  account: '778018686861',
  region: 'ap-southeast-1'
}

/**
 * Table model for saving data
 */
export const TABLE = {
  name: 'persons',
  pkPrefix: 'PERSON|',
  skPrefix: 'DATA'
}

/**
 * Queue model for sending an event to queue
 */

export const QUEUE = {
  name: 'person-events'
}

