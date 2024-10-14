import bcrypt from 'bcrypt';
import { createUser, checkUser } from '../persistence/queries/user';
import ApiError from '../exception/ApiError';
import { generateAccessToken } from '../shared/jwt';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
export default class AuthController {
  static async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password }:any = req.body;
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

      return res.json();
    } catch (error) {
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }:any = req.body;

      const user = await checkUser(email);

      if (!user) {
        throw ApiError.badRequest('The user not found!');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw ApiError.badRequest('Insert incorrect password');
      }

      const token = generateAccessToken(user.id, user.email);

      return res.json();
    } catch (error) {
      return next(error);
    }
  }
}
