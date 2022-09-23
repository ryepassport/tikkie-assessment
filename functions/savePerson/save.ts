import { savePerson, updatePerson } from '@helpers/storage/person'
import { Person } from '@models/person'

/**
 * Person request params
 */
interface PersonRequestParams {
  /**
   * Passed data for saving
   */
  data: Person
  /**
   * Specific person id
   */
  id?: string
}

/**
 * Saving data
 * @param requestData
 * See interface definition
 * @returns
 * Person data
 */
export const save = async (requestData: PersonRequestParams): Promise<Person> => {
  const { id, data } = requestData
  
  if (id) {
    const res = await updatePerson(data)
    return res
  }

  const res = await savePerson(data)
  return res
}
