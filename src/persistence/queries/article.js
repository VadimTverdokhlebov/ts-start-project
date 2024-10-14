import Article from '../models/Article.js';

export function createArticle(articleData) {
    return Article.create(articleData);
}

export function getArticles() {
    // return Article.find({ _id: { $in: articleId } });
    return Article.find().all('articles', []);

}
export function getArticle(articleId) {
    return Article.findOne({ articleId });
}

export function getUserArticles(userObjectID) {
    return Article.find({ author: { $in: userObjectID } });
}
