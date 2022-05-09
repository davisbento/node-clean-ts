import { adaptMiddleware } from '@/adapters/MiddlewareAdapter';
import { adaptRoute } from '@/adapters/RouterAdapter';
import { makeTokenMiddleware } from '@/middleware/factories/TokenMiddlewareFactory';
import { validateResource } from '@/middleware/validation';
import express from 'express';

import { makeActiveFaFactory } from './factories/ActiveFaFactory';
import { makeCreatePaymentMethodFactory } from './factories/CreatePaymentMethodFactory';
import { makeCreateSubscriptionByCardFactory } from './factories/CreateSubscriptionByCardFactory';
import { makeGetProfileController } from './factories/GetProfileFactory';
import { makeUpdateUserFactory } from './factories/UpdateUserFactory';
import { activeFaDTO } from './validation/ActiveFaDTO';
import { createPaymentMethoDTO } from './validation/CreatePaymentMethodDTO';
import { createSubscriptionByCardDTO } from './validation/CreateSubscriptionByCardDTO';
import { updateUserDTO } from './validation/UpdateUserDTO';

const router = express.Router();

router.get('/me', adaptMiddleware(makeTokenMiddleware()), adaptRoute(makeGetProfileController()));
router.post(
  '/active-fa',
  adaptMiddleware(makeTokenMiddleware()),
  validateResource(activeFaDTO),
  adaptRoute(makeActiveFaFactory())
);
router.post(
  '/payment-method',
  adaptMiddleware(makeTokenMiddleware()),
  validateResource(createPaymentMethoDTO),
  adaptRoute(makeCreatePaymentMethodFactory())
);
router.post(
  '/subscription',
  adaptMiddleware(makeTokenMiddleware()),
  validateResource(createSubscriptionByCardDTO),
  adaptRoute(makeCreateSubscriptionByCardFactory())
);
router.put(
  '/',
  adaptMiddleware(makeTokenMiddleware()),
  validateResource(updateUserDTO),
  adaptRoute(makeUpdateUserFactory())
);

export default router;
