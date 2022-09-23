import { AWS_SETTINGS } from '@constants/aws'

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
 * Main config file for aws account settings
 */
export const config: AWSAccount = {
  account: AWS_SETTINGS.account,
  region: AWS_SETTINGS.region
}
