import { Router } from 'express';
import ArticleController from '../controllers/ArticleController';
import UserController from '../controllers/UserController';
import authMiddleware from '../middlewares/authMiddleware';
import AuthController from '../controllers/AuthController';
import validationUserMiddleware from '../middlewares/validationsUserMiddleware';

const router = Router();

router.get('/api/article/:articleId(\\d+)', ArticleController.getArticle);
router.get('/api/article', ArticleController.getArticles);
router.get('/api/articles', authMiddleware, ArticleController.getUserArticles);
router.post('/api/article', authMiddleware, ArticleController.createArticle);

router.post('/api/user/like', authMiddleware, UserController.likeArticles);
router.get('/api/user', authMiddleware, UserController.getUser);
router.get('/api/users', authMiddleware, UserController.getUsers);
router.put('/api/user', authMiddleware, UserController.updateUserData);

router.post('/auth/registration', validationUserMiddleware, AuthController.registration);
router.post('/auth/login', AuthController.login);

export default router;
