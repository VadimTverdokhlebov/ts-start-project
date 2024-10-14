import jwt from 'jsonwebtoken';
import config from '../config.js';

export function generateAccessToken(id, email) {
    const { secretKey } = config.user;

    const payload = {
        id,
        email
    };

    return jwt.sign(payload, secretKey, { expiresIn: '1000h' });
}

export function getUser(token) {
    const decodetData = jwt.verify(token, config.user.secretKey);

    return decodetData;
}
