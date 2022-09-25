import { addEvent } from '@helpers/event'
import { savePerson, updatePerson } from '@helpers/storage/person'
import { Person } from '@models/person'
import { MessageEventType } from '@models/queue'

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
  let res: Person
  
  if (id) {
    res = await updatePerson({...data, id})
  } else {
    res = await savePerson(data)
  }

  // Send event to queue for processing
  await addEvent<Person>(res, id ? MessageEventType.UPDATED : MessageEventType.CREATED)

  return res
}
