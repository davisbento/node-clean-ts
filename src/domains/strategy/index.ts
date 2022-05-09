import { adaptMiddleware } from '@/adapters/MiddlewareAdapter';
import { adaptRoute } from '@/adapters/RouterAdapter';
import { checkTokenCronJob } from '@/middleware/authCronjob';
import { makeTokenMiddleware } from '@/middleware/factories/TokenMiddlewareFactory';
import express from 'express';

import { makeStrategyFindController } from './factories/StrategyFindFactory';
import { makeStrategyListController } from './factories/StrategyListFactory';
import { makeStrategyProcessControler } from './factories/StrategyProcessFactory';

const router = express.Router();

router.get('/process', checkTokenCronJob, adaptRoute(makeStrategyProcessControler()));
router.get('/:id', adaptMiddleware(makeTokenMiddleware()), adaptRoute(makeStrategyFindController()));
router.get('/', adaptMiddleware(makeTokenMiddleware()), adaptRoute(makeStrategyListController()));

export default router;
