import { adaptMiddleware } from '@/adapters/MiddlewareAdapter';
import { adaptRoute } from '@/adapters/RouterAdapter';
import { checkTokenCronJob } from '@/middleware/authCronjob';
import { makeTokenMiddleware } from '@/middleware/factories/TokenMiddlewareFactory';
import { validateResource } from '@/middleware/validation';
import express from 'express';

import { makeBotCreateController } from './factories/BotCreateFactory';
import { makeBotListControllerFactory } from './factories/BotListFactory';
import { makeBotPauseController } from './factories/BotPauseFactory';
import { makeBotProcessControler } from './factories/BotProcessFactory';
import { makeBotStartController } from './factories/BotStartFactory';
import { makeBotSummaryController } from './factories/BotSummaryControllerFactory';
import { makeBotTestController } from './factories/BotTestFactory';
import { makeBotUpdateController } from './factories/BotUpdateFactory';
import { createBotDTO } from './validation/CreateBotDTO';
import { botManageDTO } from './validation/ManageBotDTO';
import { updateBotDTO } from './validation/UpdateBotDTO';

const router = express.Router();

router.get('/:id/summary', adaptMiddleware(makeTokenMiddleware()), adaptRoute(makeBotSummaryController()));
router.get('/process', checkTokenCronJob, adaptRoute(makeBotProcessControler()));
router.get('/', adaptMiddleware(makeTokenMiddleware()), adaptRoute(makeBotListControllerFactory()));
router.put(
  '/',
  adaptMiddleware(makeTokenMiddleware()),
  validateResource(updateBotDTO),
  adaptRoute(makeBotUpdateController())
);
router.post(
  '/',
  adaptMiddleware(makeTokenMiddleware()),
  validateResource(createBotDTO),
  adaptRoute(makeBotCreateController())
);
router.post(
  '/test',
  adaptMiddleware(makeTokenMiddleware()),
  validateResource(botManageDTO),
  adaptRoute(makeBotTestController())
);

router.post(
  '/pause',
  adaptMiddleware(makeTokenMiddleware()),
  validateResource(botManageDTO),
  adaptRoute(makeBotPauseController())
);
router.post(
  '/start',
  adaptMiddleware(makeTokenMiddleware()),
  validateResource(botManageDTO),
  adaptRoute(makeBotStartController())
);

export default router;
