import {
  EnInvoiceStatus,
  IInvoice,
  IInvoiceGenerate,
  IInvoiceList,
  IInvoicePopulatedDocument
} from '@/interfaces/IInvoice';
import { ChargeResource } from 'coinbase-commerce-node';

export interface IInvoiceRepository {
  getInvoiceById(id: string): Promise<IInvoice>;
  getInvoicesByUserId(userId: string): Promise<IInvoiceList[]>;
  getInvoicesToProcessWithStrategies(): Promise<IInvoice[]>;
  getInvoicesSubscriptionOverdue(): Promise<IInvoice[]>;
  getInvoicesAwaitingConfirmation(): Promise<IInvoicePopulatedDocument[]>;
  getInvoicesToProcessWithCommission(): Promise<IInvoice[]>;
  getInvoicesToProcessWithSubscription(): Promise<IInvoice[]>;
  sumInvoicesCommissionByUserIdBotId(userId: string, botId: string): Promise<number>;
  saveInvoice(params: IInvoiceGenerate): Promise<IInvoice>;
  markAsPaid(invoiceId: string, status: EnInvoiceStatus, metadata?: ChargeResource): Promise<IInvoice>;
  changeStatus(invoiceId: string, status: EnInvoiceStatus): Promise<IInvoice>;
  markAsAwaitingConfirmation(id: string, iuguInvoiceId: string, secureUrl: string): Promise<IInvoice>;
}
