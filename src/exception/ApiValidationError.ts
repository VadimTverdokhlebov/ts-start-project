export default class ApiValidationError extends Error {
  status;

  errors;

  constructor(status: number, message: string, errors: Array<string> = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static badValidation(message: string, errors: Array<string> = []) {
    return new ApiValidationError(400, message, errors);
  }
}
