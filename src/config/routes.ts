import addressModule from '@/domains/address';
import authModule from '@/domains/auth';
import botModule from '@/domains/bot';
import exchangeModule from '@/domains/exchange';
import gatewayModule from '@/domains/gateway';
import homeModule from '@/domains/home';
import invoiceModule from '@/domains/invoice';
import paymentModule from '@/domains/payment';
import strategyModule from '@/domains/strategy';
import subscriptionModule from '@/domains/subscription';
import userModule from '@/domains/user';
import voucherModule from '@/domains/voucher';
import { Express } from 'express';

export default (app: Express): void => {
  app.use('/api/auth', authModule);
  app.use('/api/invoice', invoiceModule);
  app.use('/api/gateway', gatewayModule);
  app.use('/api/user', userModule);
  app.use('/api/address', addressModule);
  app.use('/api/bot', botModule);
  app.use('/api/strategy', strategyModule);
  app.use('/api/voucher', voucherModule);
  app.use('/api/payment', paymentModule);
  app.use('/api/subscription', subscriptionModule);
  app.use('/api/exchange', exchangeModule);

  app.use('/api/', homeModule);
};
