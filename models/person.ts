/**
 * Person data
 */
export interface Person {
  /**
   * Unique id for the person record
   */
  id?: string
  /**
   * First name of the person
   */
  firstName: string
  /**
   * Last name of the person
   */
  lastName: string
  /**
   * Phone number of the person
   */
  phone: string
  /**
   * Address information of the person
   */
  address: string
  /**
   * Created date time
   */
  createdAt?: string
  /**
   * Updated date time
   */
   updatedAt?: string
}