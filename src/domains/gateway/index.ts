import { adaptRoute } from '@/adapters/RouterAdapter';
import { checkTokenCronJob } from '@/middleware/authCronjob';
import express from 'express';

import { makeSyncBtcBrlController } from './factories/SyncBtcBrlPriceFactory';
import { makeSyncBtcPriceController } from './factories/SyncBtcPriceFactory';

const router = express.Router();

router.get('/sync-price-brl', checkTokenCronJob, adaptRoute(makeSyncBtcBrlController()));
router.get('/sync-price', checkTokenCronJob, adaptRoute(makeSyncBtcPriceController()));

export default router;
