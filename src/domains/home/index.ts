import { adaptRoute } from '@/adapters/RouterAdapter';
import express from 'express';

import { makeHomeController } from './factories/HomeFactory';

const router = express.Router();

router.get('/', adaptRoute(makeHomeController()));

export default router;
