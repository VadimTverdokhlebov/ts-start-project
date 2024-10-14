import bcrypt from 'bcrypt';
import { createUser, checkUser } from '../queries/user.js';
import ApiError from '../exception/ApiError.js';
import { generateAccessToken } from '../shared/jwt.js';

export default class AuthController {
    static async registration(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const checkEmail = await checkUser(email);

            if (checkEmail) {
                throw ApiError.badRequest('Email already exist!');
            }

            const hashedPassword = await bcrypt.hash(password, 3);
            const user = {
                password: hashedPassword,
                email,
                // photo,
                // bio,
                name
            };

            const savedUser = await createUser(user);
            const token = generateAccessToken(savedUser.id, savedUser.email);

            return res.json({ status: 'registration ok', savedUser, token });
        } catch (error) {
            return next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await checkUser(email);

            if (!user) {
                throw ApiError.badRequest('The user not found!');
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                throw ApiError.badRequest('Insert incorrect password');
            }

            const token = generateAccessToken(user.id, user.email);

            return res.json({ status: 'login ok', token });
        } catch (error) {
            return next(error);
        }
    }
}
