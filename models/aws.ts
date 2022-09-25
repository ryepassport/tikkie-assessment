/**
 * Stages properties
 */
export interface StageStackProps {
  /**
   * Account used for stage
   */
  account: string
  /**
   * Region to be deployed
   */
  region: string
  /**
   * Stage name
   */
  stage: string
}

/**
 * Stages for deployment
 */
export enum Stage {
  dev = 'dev',
  test = 'test',
  staging = 'staging',
  prod = 'prod'
}

/**
 * Stage configuration
 */
export type StageRecord = Record<Stage, StageStackProps>

/**
 * Stages for deployment
 */
export interface Stages<T> {
  /**
   * Dev stage
   */
  dev: T,

  /**
   * Test stage
   */
  test: T,
  /**
   * Staging stage
   */
  staging: T,
  /**
   * Production stage
   */
  prod: T
}
