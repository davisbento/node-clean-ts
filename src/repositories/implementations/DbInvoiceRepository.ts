import { Invoice } from '@/entities/Invoice';
import { subtractDays } from '@/helpers/Date';
import {
  EnInvoiceStatus,
  EnInvoiceType,
  IInvoice,
  IInvoiceGenerate,
  IInvoiceList,
  IInvoicePopulatedDocument
} from '@/interfaces/IInvoice';
import { ChargeResource } from 'coinbase-commerce-node';

import { IInvoiceRepository } from '../IInvoiceRepository';

export class DbInvoiceRepository implements IInvoiceRepository {
  constructor(private readonly invoiceModel: typeof Invoice) {}

  public async getInvoiceById(id: string): Promise<IInvoice> {
    return this.invoiceModel.findById(id);
  }

  public async saveInvoice(params: IInvoiceGenerate): Promise<IInvoice> {
    const invoice = new Invoice({ ...params });

    const response = await invoice.save();

    return response;
  }

  public async sumInvoicesCommissionByUserIdBotId(userId: string, botId: string): Promise<number> {
    const invoices: IInvoice[] = await this.invoiceModel.find({
      userId,
      botId,
      paid: true,
      pricing: { $exists: true },
      type: EnInvoiceType.performanceCommission
    });

    return invoices.reduce((prev, curr) => parseFloat(curr.pricing.bitcoin.amount) + prev, 0);
  }

  public async getInvoicesByUserId(userId: string): Promise<IInvoiceList[]> {
    const invoices: IInvoice[] = await this.invoiceModel.find(
      { userId, addresses: { $exists: true } },
      {},
      { sort: { createdAt: -1 } }
    );

    if (invoices.length === 0) {
      return [];
    }

    return invoices.map(invoice => ({
      id: invoice._id,
      createdAt: invoice.createdAt,
      status: invoice.status,
      currency: invoice.currency,
      expiresAt: invoice.expiresAt,
      priceFiat: invoice?.priceFiat || parseFloat(invoice?.pricing?.local?.amount || '0'),
      type: invoice.type,
      addresses: invoice.addresses,
      pricing: invoice.pricing,
      subscriptionId: invoice.subscriptionId,
      secureUrl: invoice.secureUrl
    }));
  }

  async markAsPaid(id: string, newStatus: EnInvoiceStatus, metadata?: ChargeResource): Promise<IInvoice> {
    if (metadata) {
      return this.invoiceModel.findByIdAndUpdate(id, { paid: true, paidAt: new Date(), status: newStatus, metadata });
    }
    return this.invoiceModel.findByIdAndUpdate(id, { paid: true, paidAt: new Date(), status: newStatus });
  }

  async markAsAwaitingConfirmation(id: string, iuguInvoiceId: string, secureUrl: string): Promise<IInvoice> {
    return this.invoiceModel.findByIdAndUpdate(id, {
      status: EnInvoiceStatus.awaitingConfirmation,
      idIugu: iuguInvoiceId,
      secureUrl
    });
  }

  async changeStatus(id: string, status: EnInvoiceStatus): Promise<IInvoice> {
    return this.invoiceModel.findByIdAndUpdate(id, { status });
  }

  public async getInvoicesToProcessWithStrategies(): Promise<IInvoice[]> {
    return this.invoiceModel.find({
      expiresAt: { $gte: subtractDays(2) },
      metadata: { $exists: true },
      type: { $in: [EnInvoiceType.strategyPurchase, EnInvoiceType.membership] },
      status: { $in: [EnInvoiceStatus.pending, EnInvoiceStatus.forced, EnInvoiceStatus.underpaid] },
      paid: false
    });
  }

  public async getInvoicesToProcessWithSubscription(): Promise<IInvoice[]> {
    return this.invoiceModel.find({
      expiresAt: { $gte: subtractDays(2) },
      metadata: { $exists: true },
      type: {
        $in: [EnInvoiceType.subscription, EnInvoiceType.subscriptionPurchase, EnInvoiceType.subscriptionUpgrade]
      },
      status: { $in: [EnInvoiceStatus.pending, EnInvoiceStatus.forced, EnInvoiceStatus.underpaid] },
      paid: false
    });
  }

  public async getInvoicesToProcessWithCommission(): Promise<IInvoice[]> {
    return this.invoiceModel.find({
      expiresAt: { $gte: subtractDays(2) },
      metadata: { $exists: true },
      type: { $eq: EnInvoiceType.performanceCommission },
      status: { $in: [EnInvoiceStatus.pending, EnInvoiceStatus.forced, EnInvoiceStatus.underpaid] },
      paid: false
    });
  }

  public async getInvoicesAwaitingConfirmation(): Promise<IInvoicePopulatedDocument[]> {
    return this.invoiceModel
      .find({
        expiresAt: { $gte: subtractDays(5) },
        type: {
          $in: [EnInvoiceType.subscription, EnInvoiceType.subscriptionPurchase, EnInvoiceType.subscriptionUpgrade]
        },
        status: { $eq: EnInvoiceStatus.awaitingConfirmation },
        idIugu: { $exists: true },
        paid: false
      })
      .populate('user');
  }

  public async getInvoicesSubscriptionOverdue(): Promise<IInvoice[]> {
    return this.invoiceModel.find({
      expiresAt: { $gte: subtractDays(3) },
      type: { $eq: EnInvoiceType.subscription },
      status: { $eq: EnInvoiceStatus.pending },
      paid: false
    });
  }
}
