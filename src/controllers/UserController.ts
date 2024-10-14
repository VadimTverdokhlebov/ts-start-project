import { createUser, getUsers, checkUser, updateUserData } from '../queries/user.js';
import mongoose from 'mongoose';
import User from '../models/User.js';
export default class UserController {
    static async createUser(req, res, next) {
        try {
            const { email, password, photo, bio, name } = req.body;
            const result = await createUser({ email, password, photo, bio, name });
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }
    static async getUsers(req, res, next) {
        try {
            const result = await getUsers();
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    static async updateUserData(req, res, next) {
        try {
            const { bio, photo, name } = req.body;
            const email = req.user.email;
            const result = await updateUserData(email, { bio, photo, name });
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    static async getUser(req, res, next) {
        try {
            // const userId = req.params.userId;
            const email = req.user.email;
            const result = await checkUser(email);
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    static async likeArticles(req, res, next) {
        try {
            const { articleObjectId } = req.body;
            const email = req.user.email;
            const user = await checkUser(email);
            const articleId = new mongoose.Types.ObjectId(articleObjectId)
            const result = await updateUserData(email, { savedArticles: articleId});

            await User.findByIdAndUpdate(
                user._id,
                { $push: { savedArticles: { article: articleId } } },
                { new: true, useFindAndModify: false }
            );
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }
}
