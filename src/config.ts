import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  port: number;
  appUrl: string;
  user: {
    secretKey: string;
  };
}

const config: IConfig = {
  dbHost: process.env.DB_HOST!,
  dbPort: parseInt(process.env.DB_PORT!, 10),
  dbUser: process.env.DB_USER!,
  dbPassword: process.env.DB_PASSWORD!,
  dbName: process.env.DB_NAME!,
  port: parseInt(process.env.SERVER_PORT!, 10),
  appUrl: process.env.APP_URL!,
  user: {
    secretKey: process.env.SECRET_KEY!
  }
};

export default config;
