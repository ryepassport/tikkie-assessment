// istanbul ignore file

import { v4 as uuidv4 } from 'uuid'
import { Person } from '@models/person'
import { getISODate } from '@helpers/date'
import * as ddb from '@helpers/aws/ddb'
import { MaybeUndefined } from '@models/common'
import { TABLE } from '@bin/util'

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
    TableName: process.env.TABLE_NAME as string,
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
  const pk = `${TABLE.pkPrefix}${data.id}`
  const sk = 'DATA'

  data.updatedAt = getISODate()

  await ddb.update({
    TableName: process.env.TABLE_NAME as string,
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

/**
 * Removes a person from record
 * @param id 
 * Unique id number for the person
 * @returns 
 */
 export const removePerson = async (id: string): Promise<void> => {
  const { Items: items } = await ddb.query({
    TableName: process.env.TABLE_NAME as string,
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: {
      '#pk': 'pk'
    },
    ExpressionAttributeValues: {
      ':pk': `${TABLE.pkPrefix}${id}`
    }
  })

  if (!items || items.length === 0) {
    throw new Error('The record you are trying to delete is not available.')
  }

  await ddb.batchWrite({
    RequestItems: {
      [process.env.TABLE_NAME as string]: items.map(v => ({
        DeleteRequest: {
          Key: {
            pk: v.pk,
            sk: v.sk
          }
        }
      }))
    }
  })
}

/**
 * Returns all persons from the data store
 * @returns
 * Collection of persons
 */
export const getPersons = async (): Promise<MaybeUndefined<Person[]>> => {
  const { Items } = await ddb.query({
    TableName: process.env.TABLE_NAME as string,
    IndexName: 'reverse',
    KeyConditionExpression: '#sk = :sk and begins_with(#pk, :pk)',
    ExpressionAttributeNames: {
      '#pk': 'pk',
      '#sk': 'sk'
    },
    ExpressionAttributeValues: {
      ':pk': `${TABLE.pkPrefix}`,
      ':sk': `${TABLE.skPrefix}`
    }
  })

  if (!Items || Items.length === 0) {
    return []
  }

  return Items.map(item => {
    return {
      ...item.data
    }
  })
}

/**
 * Returns an individual person data based on passed id
 * @param id
 * Unique ID of a person record
 * @returns
 * Person data, see interface definition
 */
export const getPerson = async (id: string): Promise<MaybeUndefined<Person>> => {
  const { Item: item } = await ddb.get({
    TableName: process.env.TABLE_NAME as string,
    Key: {
      pk: `${TABLE.pkPrefix}${id}`,
      sk: `${TABLE.skPrefix}`
    }
  })

  if (!item) {
    return
  }

  return {
    ...item.data
  }
}
