import { adaptMiddleware } from '@/adapters/MiddlewareAdapter';
import { adaptRoute } from '@/adapters/RouterAdapter';
import { checkTokenCronJob } from '@/middleware/authCronjob';
import { makeTokenMiddleware } from '@/middleware/factories/TokenMiddlewareFactory';
import { validateResource } from '@/middleware/validation';
import express from 'express';

import { makeInvoiceListController } from './factories/InvoiceListControllerFactory';
import { makeInvoiceProcessIuguController } from './factories/InvoiceProcessIuguControllerFactory';
import { makeInvoiceProcessOverdueController } from './factories/InvoiceProcessOverdueControllerFactory';
import { makeInvoiceProcessStrategyController } from './factories/InvoiceProcessStragegyControllerFactory';
import { makeInvoiceProcessSubscriptionController } from './factories/InvoiceProcessSubscriptionControllerFactory';
import { makeInvoicePurchaseController } from './factories/InvoicePurchaseControllerFactory';
import { makeInvoiceUpgradeController } from './factories/InvoiceUpgradeControllerFactory';
import { invoicePurchaseDTO } from './validation/InvoicePurchaseDTO';
import { upgradeInvoiceDto } from './validation/InvoiceUpgradeDTO';

const router = express.Router();

router.get('/process/strategy', checkTokenCronJob, adaptRoute(makeInvoiceProcessStrategyController()));
router.get('/process/subscription', checkTokenCronJob, adaptRoute(makeInvoiceProcessSubscriptionController()));
router.get('/process/overdue', checkTokenCronJob, adaptRoute(makeInvoiceProcessOverdueController()));
router.get('/process/iugu', checkTokenCronJob, adaptRoute(makeInvoiceProcessIuguController()));
router.get('/', adaptMiddleware(makeTokenMiddleware()), adaptRoute(makeInvoiceListController()));
router.post('/webhook', (req, res) => {
  console.log(req.body, 'webhook post');
  res.json({ message: 'ok' });
});
router.post(
  '/purchase',
  adaptMiddleware(makeTokenMiddleware()),
  validateResource(invoicePurchaseDTO),
  adaptRoute(makeInvoicePurchaseController())
);
router.post(
  '/upgrade',
  adaptMiddleware(makeTokenMiddleware()),
  validateResource(upgradeInvoiceDto),
  adaptRoute(makeInvoiceUpgradeController())
);

export default router;
