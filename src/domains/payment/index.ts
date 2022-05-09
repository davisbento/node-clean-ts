import { adaptRoute } from '@/adapters/RouterAdapter';
import { checkTokenCronJob } from '@/middleware/authCronjob';
import express from 'express';

import { makePaymentCommissionProcessController } from './factories/PaymentCommissionProcessControllerFactory';
import { makePaymentMembershipProcessController } from './factories/PaymentMembershipProcessControllerFactory';
import { makePaymentSubscriptionProcessController } from './factories/PaymentSubscriptionProcessControllerFactory';

const router = express.Router();

router.get('/process/membership', checkTokenCronJob, adaptRoute(makePaymentMembershipProcessController()));
router.get('/process/commission', checkTokenCronJob, adaptRoute(makePaymentCommissionProcessController()));
router.get('/process/subscription', checkTokenCronJob, adaptRoute(makePaymentSubscriptionProcessController()));

export default router;
