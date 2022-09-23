import { getPerson, getPersons } from '@helpers/storage/person'
import { Person } from '@models/person'

/**
 * Lambda logical function that fetches one or more persons
 * @param id
 * An optional id passed to get only one data
 * @returns
 * A collection or one Person data
 */
export const get = async(id?: string): Promise<Person | Person[]> => {
  if (id) {
    return await getPerson(id) as Person
  }

  const items = await getPersons()

  return items as Person[]
}
