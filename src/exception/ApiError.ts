export default class ApiError extends Error {
    status;

    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static unauthorization() {
        return new ApiError(401, 'User is not login');
    }

    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}
