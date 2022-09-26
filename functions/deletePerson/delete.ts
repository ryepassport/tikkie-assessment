import { addEvent } from '@helpers/event'
import { publishMessage } from '@helpers/publishMessage'
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

  // Send event to queue for processing
  await addEvent<DeleteEvent>({ id }, MessageEventType.DELETED)

  // Send message to sns topic
  await publishMessage<DeleteEvent>({ id }, MessageEventType.DELETED)
}
