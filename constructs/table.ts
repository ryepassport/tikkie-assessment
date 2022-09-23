import { AttributeType, BillingMode, Table, TableEncryption } from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'

/**
 * Unique props for the table
 */
export interface TableProps {
  /**
   * Table name
   */
  tableName: string
}

/**
 * Construct for table used as data store
 */
export class PersonTable extends Table {
  constructor(scope: Construct, id: string, props: TableProps) {
    super(scope, id, {
      tableName: props.tableName,
      partitionKey: {
        name: 'pk',
        type: AttributeType.STRING
      },
      sortKey: {
        name: 'sk',
        type: AttributeType.STRING
      },
      encryption: TableEncryption.AWS_MANAGED,
      billingMode: BillingMode.PAY_PER_REQUEST,
    })
  
    this.addGlobalSecondaryIndex({
      indexName: 'reverse',
      partitionKey: {
        name: 'sk',
        type: AttributeType.STRING
      },
      sortKey: {
        name: 'pk',
        type: AttributeType.STRING
      }
    })
  }
}
