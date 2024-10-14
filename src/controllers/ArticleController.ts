import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { createArticle, getArticle, getArticles, getUserArticles } from '../persistence/queries/article';
import { checkUser } from '../persistence/queries/user';
export default class ArticleController {
  static async createArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const { content, category, title, tags, img, description }: any = req.body;
      // const email = req.user.email;
      // const user = await checkUser(email);
      // const result = await createArticle({
      //   content,
      //   category: category,
      //   title,
      //   tags,
      //   img,
      //   description,
      //   author: user.id
      // });
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  static async getArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getArticles();
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  static async getArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const articleId= req.params.articleId;
      const result = await getArticle(articleId);
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  static async getUserArticles(req: Request, res: Response, next: NextFunction) {
    try {
      // const email = req.user.email;
      // const user = await checkUser(email);
      // const result = await getUserArticles(user._id);
      return res.json();
    } catch (err) {
      next(err);
    }
  }
}
