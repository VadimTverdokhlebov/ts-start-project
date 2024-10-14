import 'reflect-metadata';
import config from '../config';
import { DataSource } from 'typeorm';
import { User } from './models/User';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: []
});
