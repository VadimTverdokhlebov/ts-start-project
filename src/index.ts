import express from 'express';
import path from 'path';
import config from './config';

import { AppDataSource } from './persistence/data-source';

function server() {
    try {
        const app = express();
        const PORT = config.serverPort;
        const HOST = config.serverHost;
        const publicPath = path.join(__dirname, 'public');

        app.use(express.json());
        app.use(express.static(publicPath));

        app.listen(PORT, () => console.log(`Express HTTP server listening on http://${HOST}:${PORT}`));
    } catch (error) {
        console.error('Start server error:', error);
    }
}

AppDataSource.initialize()
    .then(async () => server())
    .catch((error: any) => console.log(error));
