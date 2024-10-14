import express from 'express';
import path from 'path';
import config from './config';

import { AppDataSource } from './persistence/data-source';
import errorsMiddleware from './middlewares/errorsMiddleware';

function server() {
  try {
    const app = express();
    const publicPath = path.join(__dirname, 'public');

    app.use(express.json());
    app.use(express.static(publicPath));
    app.use(errorsMiddleware);
    app.listen(config.port, () => console.log(`Express HTTP server listening on ${config.appUrl}`));
  } catch (error) {
    console.error('Start server error:', error);
  }
}

AppDataSource.initialize()
  .then(async () => server())
  .catch((error: any) => console.log(error));
