import jwt from 'jsonwebtoken';
import config from '../config.js';
import ApiError from '../exception/ApiError.js';

export default function authJwtMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw ApiError.unauthorization();
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            throw ApiError.unauthorization();
        }

        const decodetData = jwt.verify(token, config.user.secretKey);
        req.user = decodetData;
        return next();
    } catch (error) {
        return next(error);
    }
}
