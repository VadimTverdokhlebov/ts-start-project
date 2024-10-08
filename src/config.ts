import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
    APP_URL: string;
    LOGIN: string;
    PASSWORD: string;
}

const config: IConfig = {
    APP_URL: process.env.APP_URL!,
    LOGIN: process.env.LOGIN!,
    PASSWORD: process.env.PASSWORD!,
};

export default config;
