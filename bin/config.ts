/**
 * AWS Specific config type
 */
interface AWSAccount {
  /**
   * Account used for deploying infra
   */
  account: string
  /**
   * Target region for deployment
   */
  region: string
}

/**
 * Table settings
 */
interface Table {
  /**
   * Name of table where data will be stored
   */
  tableName: string
}

/**
 * Main config file for aws account settings
 */
export const config: AWSAccount = {
  account: '778018686861',
  region: 'ap-southeast-1'
}

export const table: Table = {
  tableName: 'persons'
}