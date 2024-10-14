import { getRepository } from 'typeorm';
import { Comment } from '../entity/Comment'; // Adjust the path as necessary

export async function createComment(commentData: Partial<Comment>): Promise<Comment> {
    const commentRepository = getRepository(Comment);
    const comment = commentRepository.create(commentData); // Create a new instance of Comment
    return await commentRepository.save(comment); // Save the comment to the database
}

export async function getComments(articleId: number): Promise<Comment[]> {
    const commentRepository = getRepository(Comment);
    return await commentRepository.find({ where: { article: articleId } }); // Find comments by article ID
}

export async function updateComment(commentData: Partial<Comment>): Promise<void> {
    const commentRepository = getRepository(Comment);
    await commentRepository.update(commentData.id, { ...commentData }); // Update the comment by its ID
}