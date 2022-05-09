import { adaptMiddleware } from '@/adapters/MiddlewareAdapter';
import { adaptRoute } from '@/adapters/RouterAdapter';
import { checkTokenCronJob } from '@/middleware/authCronjob';
import { makeTokenMiddleware } from '@/middleware/factories/TokenMiddlewareFactory';
import express from 'express';

import { makeSubscriptionListController } from './factories/SubscriptionListFactory';
import { makeSubscriptionSyncController } from './factories/SubscriptionSyncFactory';

const router = express.Router();

router.get('/', adaptMiddleware(makeTokenMiddleware()), adaptRoute(makeSubscriptionListController()));
router.post('/sync', checkTokenCronJob, adaptRoute(makeSubscriptionSyncController()));

export default router;
