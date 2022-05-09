import { adaptMiddleware } from '@/adapters/MiddlewareAdapter';
import { adaptRoute } from '@/adapters/RouterAdapter';
import { makeTokenMiddleware } from '@/middleware/factories/TokenMiddlewareFactory';
import express from 'express';

import { makeVoucherAvailableController } from './factories/VoucherAvailableControllerFactory';

const router = express.Router();

router.get('/available', adaptMiddleware(makeTokenMiddleware()), adaptRoute(makeVoucherAvailableController()));

export default router;
