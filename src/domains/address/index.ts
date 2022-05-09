import { adaptRoute } from '@/adapters/RouterAdapter';
import { checkTokenCronJob } from '@/middleware/authCronjob';
import express from 'express';

import { makeNewAddressController } from './factories/NewAddressFactory';

const router = express.Router();

router.post('/new', checkTokenCronJob, adaptRoute(makeNewAddressController()));

export default router;
