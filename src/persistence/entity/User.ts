import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Article } from './Article';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', nullable: true })
  photo?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'varchar', nullable: false })
  password!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @ManyToOne(() => User, user => user.author)
  @JoinColumn({ name: 'authorId' })
  author?: User;

  @OneToMany(() => Article, article => article.savedBy)
  savedArticles!: Article[];
  articles: any;
  comments: any;
}
