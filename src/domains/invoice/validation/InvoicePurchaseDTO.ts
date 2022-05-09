import { EnInvoiceType } from '@/interfaces/IInvoice';
import * as yup from 'yup';

export const invoicePurchaseDTO = yup.object({
  id: yup.string().required(),
  type: yup.string().required().oneOf([EnInvoiceType.strategyPurchase, EnInvoiceType.subscriptionPurchase])
});
