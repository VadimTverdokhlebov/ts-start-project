import ApiError from '../exception/ApiError.js';
import ApiValidationError from '../exception/ApiValidationError.js';
import logger from '../shared/logger.js';

// eslint-disable-next-line no-unused-vars
export default async function errorsMiddleware(err, req, res, next) {
    if (err instanceof ApiError) {
        logger.error({ message: err.message, errors: err.errors });
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }

    if (err instanceof ApiValidationError) {
        logger.error({ message: err.message, errors: err.errors });
        return res.status(400).json({ message: err.message, errors: err.errors });
    }

    logger.error(err);
    return res.status(500).json({ message: err.message });
}
