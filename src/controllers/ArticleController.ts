import { createArticle, getArticle, getArticles, getUserArticles } from '../queries/article.js';
import { checkUser } from '../queries/user.js';
export default class ArticleController {
    static async createArticle(req, res, next) {
        try {
            const { content, category, title, tags, img, description } = req.body;
            const email = req.user.email;
            const user = await checkUser(email);
            const result = await createArticle({ content, category: category, title, tags, img, description, author:user._id});
            return res.json({ result });
        } catch (err) {
            next(err);
        }
    }
    static async getArticles(req, res, next) {
        try {
            const result = await getArticles();
            return res.json({ result });
        } catch (err) {
            next(err);
        }
    }
    static async getArticle(req, res, next) {
        try {
            const articleId = req.params.articleId;
            const result = await getArticle(articleId);
            return res.json({ result });
        } catch (err) {
            next(err);
        }
    }
    static async getUserArticles(req, res, next) {
        try {
            const email = req.user.email;
            const user = await checkUser(email);
            const result = await getUserArticles(user._id);
            return res.json({ result });
        } catch (err) {
            next(err);
        }
    }
}
