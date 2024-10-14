import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, user => user.articles)
  @JoinColumn({ name: 'authorId' })
  author!: User;

  @Column({ type: 'text', nullable: false })
  content!: string;

  @Column({ type: 'varchar', nullable: true })
  @Column({ type: 'text', nullable: false })
  @Column({ type: 'varchar', nullable: false })
  @Column({ type: 'varchar', nullable: false })
  title!: string;

  @Column('simple-array')
  tags!: string[];

  @Column({ type: 'int', unique: true })
  articleId!: number;
  comments: any;
  savedBy: any;
}
