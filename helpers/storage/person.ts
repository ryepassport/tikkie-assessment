// istanbul ignore file

import { v4 as uuidv4 } from 'uuid'
import { Person } from '@models/person'
import { getISODate } from '@helpers/date'
import * as ddb from '@helpers/aws/ddb'
import { TABLE } from '@constants/aws'

/**
 * Save person data to ddb
 * @param data
 * See interface definition
 * @returns
 * Person, see interface definition
 */
export const savePerson = async (data: Person): Promise<Person> => {
  const personId = uuidv4()
  const createdAt = getISODate()

  data.id = personId
  data.createdAt = createdAt
  data.updatedAt = createdAt

  await ddb.put({
    TableName: TABLE.name,
    Item: {
      pk: `${TABLE.pkPrefix}${personId}`,
      sk: `${TABLE.skPrefix}`,
      data,
      created: createdAt,
      updated: createdAt
    }
  })

  return data
}

/**
 * Update a person data
 * @param data
 * See interface definition
 * @returns
 * Person data, see interface definition
 */
export const updatePerson = async (data: Person): Promise<Person> => {
  const pk = `${TABLE.name}${data.id}`
  const sk = 'DATA'

  data.updatedAt = getISODate()

  await ddb.update({
    TableName: TABLE.name,
    Key: {
      pk,
      sk
    },
    UpdateExpression: 'set #data = :data',
    ExpressionAttributeNames: {
      '#data': 'data'
    },
    ExpressionAttributeValues: {
      ':data': data
    }
  })

  return data
}