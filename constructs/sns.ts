import { Topic } from 'aws-cdk-lib/aws-sns'
import { Construct } from 'constructs'


/**
 * SNS params
 */
export interface SnsProps {
  /**
   * Name of sns
   */
  snsName: string
}

export class PersonSns extends Topic {
  constructor(scope: Construct, id: string, props: SnsProps) {
    super(scope, id, {
      topicName: props.snsName
    })
  }
}