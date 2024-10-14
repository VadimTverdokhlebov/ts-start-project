import { getRepository } from 'typeorm';
import { Article } from '../entity/Article';

export async function createArticle(articleData: Partial<Article>): Promise<Article> {
  const articleRepository = getRepository(Article);
  const article = articleRepository.create(articleData);
  return await articleRepository.save(article);
}

export async function getArticles(): Promise<Article[]> {
  const articleRepository = getRepository(Article);
  return await articleRepository.find(); // Retrieve all articles
}

export async function getArticle(articleId: number): Promise<Article | null> {
  const articleRepository = getRepository(Article);
  return await articleRepository.findOne({ where: { articleId } });
}

export async function getUserArticles(userObjectID: string): Promise<Article[]> {
  const articleRepository = getRepository(Article);
  return await articleRepository.find({ where: { author: userObjectID } });
}
