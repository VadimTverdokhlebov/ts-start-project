import 'reflect-metadata';
import config from '../config';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Article } from './entity/Article';
import { Comment } from './entity/Comment';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: true,
  logging: false,
  entities: [User, Article, Comment],
  migrations: [],
  subscribers: []
});
