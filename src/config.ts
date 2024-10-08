import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  appUrl: string;
  login: string;
  password: string;
}

const config: IConfig = {
  appUrl: process.env.APP_URL!,
  login: process.env.LOGIN!,
  password: process.env.PASSWORD!
};

export default config;
