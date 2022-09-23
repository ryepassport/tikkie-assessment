/**
 * Returns passed date in ISO format. If no param is supplied, it returns current date
 * @param date 
 * Optional date
 */
 export const getISODate = (date?: string): string => {
  return (date ? new Date(date): new Date()).toISOString()
}