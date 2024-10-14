export default class ApiValidationError extends Error {
    status;

    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static badValidation(message, errors = []) {
        return new ApiValidationError(400, message, errors);
    }
}
