import * as Joi from 'joi'

/**
 * Class interpreting Joi validation result
 */
export class RequestValidationResult<T> {
  /**
   * Initial validation result
   */
  private validation: Joi.ValidationResult

  /**
   * Errors to be return if present
   */
  public errors: string[] = []

  /**
   * Validated values if validation passed
   */
  public value: T = {} as T

  /**
   * Creates new RequestValidationResult
   * @param validation 
   */
  constructor(validation: Joi.ValidationResult) {
    this.validation = validation
    this.extractErrors()
    this.extractValue()
  }

  /**
   * Extracts values from validation
   */
  private extractValue = () => {
    this.value = this.validation.value
  }

  /**
   * Extract errors from validation
   */
  private extractErrors = () => {
    if (this.validation.error) {
      this.errors = this.validation.error.details.map(error => error.message)
    }
  }
}
