import { addEvent } from '@helpers/event'
import { removePerson } from '@helpers/storage/person'
import { MessageEventType } from '@models/queue'

/**
 * Delete message event type
 */
interface DeleteEvent {
  /**
   * Deleted unique id
   */
  id: string
}


/**
 * Delete handler logic
 * @param id
 * Unique id of the Person to be deleted
 */
export const remove = async (id: string): Promise<void> => {
  await removePerson(id)

  await addEvent<DeleteEvent>({ id }, MessageEventType.DELETED)
}
