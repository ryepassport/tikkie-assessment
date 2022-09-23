/**
 * Function that safely parses JSON rather than throwing an error
 * @param data 
 * @returns 
 */
 export const safeParse = (data: string) => {
  try {
    return JSON.parse(data)
  } catch (e) {
    return undefined
  }
}