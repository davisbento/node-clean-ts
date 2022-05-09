import { adaptMiddleware } from '@/adapters/MiddlewareAdapter';
import { adaptRoute } from '@/adapters/RouterAdapter';
import { makeTokenMiddleware } from '@/middleware/factories/TokenMiddlewareFactory';
import { validateResource } from '@/middleware/validation';
import express from 'express';

import { makeExchangeCreateController } from './factories/ExchangeCreateFactory';
import { makeExchangeListByUserController } from './factories/ExchangeListByUserUseCase';
import { exchangesCreateDTO } from './validation/ExchangesCreateDTO';

const router = express.Router();

router.get('/', adaptMiddleware(makeTokenMiddleware()), adaptRoute(makeExchangeListByUserController()));
router.post(
  '/',
  adaptMiddleware(makeTokenMiddleware()),
  validateResource(exchangesCreateDTO),
  adaptRoute(makeExchangeCreateController())
);

export default router;
