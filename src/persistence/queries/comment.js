import Comment from '../models/Comment.js';

export function createComment(commentData) {
    return Comment.create(commentData);
}

export function getComments(articleId) {
    return Comment.find({ article: { $in: articleId } });
}

export function updateComment(commentData) {
    return Comment.updateOne({ _id: commentData._id }, { $set: commentData });
}
