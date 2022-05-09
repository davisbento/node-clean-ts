import 'dotenv/config';

import { errorHandling } from '@/middleware/error';
import { createTerminus } from '@godaddy/terminus';
import express from 'express';
import mongoose from 'mongoose';

import { createConnection } from './db';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import { PORT } from './settings';

const app = express();

export const createServer = async () => {
  await createConnection();

  setupMiddlewares(app);
  setupRoutes(app);
  app.use(errorHandling);

  const closeConnection = async () => {
    return new Promise(resolve => {
      mongoose.connection.close(false, () => {
        console.log('MongoDb connection closed.');
        resolve(true);
      });
    });
  };

  const checkMongoConnection = async () => {
    return new Promise(resolve => {
      resolve(mongoose.connection.readyState === 1);
    });
  };

  const onSignal = async () => {
    console.log('server is starting cleanup');
    await closeConnection();
  };

  const onHealthCheck = async () => {
    await Promise.all([checkMongoConnection()]);
  };

  const server = app.listen(PORT, () => {
    console.log('BACKEND RUNNING ON PORT', PORT);
  });

  createTerminus(server, {
    signal: 'SIGINT',
    healthChecks: { '/healthcheck': onHealthCheck },
    onSignal
  });
};
