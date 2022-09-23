import { removePerson } from '@helpers/storage/person'

/**
 * Delete handler logic
 * @param id
 * Unique id of the Person to be deleted
 */
export const remove = async (id: string): Promise<void> => {
  await removePerson(id)
}
