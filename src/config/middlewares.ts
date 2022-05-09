import compression from 'compression';
import cors from 'cors';
import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

import { FRONT_DOMAIN, IS_PROD } from './settings';

const domains = IS_PROD ? FRONT_DOMAIN : '*';

export default (app: Express): void => {
  app.use(express.json());
  app.use(cors({ origin: domains, optionsSuccessStatus: 200 }));
  app.use(morgan('combined'));
  app.use(compression());
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 2 * 60 * 1000, // 2 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })
  );
};
