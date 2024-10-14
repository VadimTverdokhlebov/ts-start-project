import { createUser, getUsers, checkUser, updateUserData } from '../persistence/queries/user';
import { User } from '../persistence/entity/User';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ICustomRequest } from '../middlewares/authMiddleware';
export default class UserController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, photo, bio, name }: any = req.body;
      const result = await createUser({ email, password, photo, bio, name });
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getUsers();
      return res.json({});
    } catch (err) {
      next(err);
    }
  }

  static async updateUserData(req: ICustomRequest, res: Response, next: NextFunction) {
    try {
      const { bio, photo, name }: any = req.body;
      // const email: any = req.user.email;
      // const result = await updateUserData(email, { bio, photo, name });
      return res.json({});
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req: ICustomRequest, res: Response, next: NextFunction) {
    try {
      // const userId = req.params.userId;
      // const email = req.user.email;
      // const result = await checkUser(email);
      return res.json({});
    } catch (err) {
      next(err);
    }
  }

  static async likeArticles(req: ICustomRequest, res: Response, next: NextFunction) {
    try {
      const { articleObjectId } = req.body;
      // const email = req.user.email;
      // const user = await checkUser(email);
      // const articleId = new mongoose.Types.ObjectId(articleObjectId);
      // const result = await updateUserData(email, { savedArticles: articleId });

      // await User.findByIdAndUpdate(
      //   user._id,
      //   { $push: { savedArticles: { article: articleId } } },
      //   { new: true, useFindAndModify: false }
      // );
      return res.json({});
    } catch (err) {
      next(err);
    }
  }
}
