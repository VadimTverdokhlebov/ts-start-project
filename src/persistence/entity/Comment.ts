import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Article } from './Article';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'authorId' })
  author!: User;

  @Column({ type: 'text', nullable: false })
  content!: string;

  @ManyToOne(() => Comment, comment => comment.answer, { nullable: true })
  @JoinColumn({ name: 'answerId' })
  answer?: Comment;

  @ManyToOne(() => Article, article => article.comments)
  @JoinColumn({ name: 'articleId' })
  article!: Article;

  @Column({ type: 'int', unique: true })
  commentId!: number;
}
