import { addMoreDays } from '@/helpers/Date';
import { ICoinbaseProvider } from '@/infra/coinbase/ICoinbaseProvider';
import { EnInvoiceStatus, EnInvoiceType, IInvoice } from '@/interfaces/IInvoice';
import { EnPaymentType } from '@/interfaces/IPaymentEvent';
import { IInvoiceRepository } from '@/repositories/IInvoiceRepository';
import { IPaymentEventRepository } from '@/repositories/IPaymentEventRepository';
import { IUserRepository } from '@/repositories/IUserRepository';

export class InvoiceProcessSubscriptionUseCase {
  constructor(
    private invoiceRepository: IInvoiceRepository,
    private coinbaseProvider: ICoinbaseProvider,
    private paymentEventRepository: IPaymentEventRepository,
    private userRepository: IUserRepository
  ) {}

  public async process(): Promise<void> {
    const invoices = await this.invoiceRepository.getInvoicesToProcessWithSubscription();

    const startedAt = new Date().toISOString();
    let invoicesProcessedSuccessfully = 0;
    let invoicesProcessedWithError = 0;

    console.log(`started at: ${startedAt}, find ${invoices.length} invoices`);

    for (const invoice of invoices) {
      const { shouldMarkAsPaied, newStatus, metadata } = await this.shouldMarkInvoiceAsPaied(invoice);

      if (!shouldMarkAsPaied) {
        continue;
      }

      try {
        await this.invoiceRepository.markAsPaid(invoice._id, newStatus, metadata);
        await this.processSubscription(invoice);
        invoicesProcessedSuccessfully++;
      } catch (err) {
        console.log(err, `invoice processing ${invoice._id}`);
        invoicesProcessedWithError++;
      }
    }

    console.log(
      `
        -----------------------------------------------------------------------
        | finished at: ${new Date().toISOString()}                            
        | success: ${invoicesProcessedSuccessfully}                           
        | error: ${invoicesProcessedWithError}
        -----------------------------------------------------------------------
      `
    );
  }

  private async processSubscription(invoice: IInvoice) {
    await this.userRepository.updateUser(invoice.userId, {
      subscription: invoice.subscription,
      hasPaiedSubscription: true
    });

    if (invoice.type === EnInvoiceType.subscriptionPurchase) {
      await this.paymentEventRepository.cancelOldSubscriptionsByUserId(invoice.userId);

      await this.paymentEventRepository.saveEvent({
        subscriptionId: invoice.subscriptionId,
        subscription: invoice.subscription,
        userId: invoice.userId,
        paymentType: EnPaymentType.subscription,
        chargeDate: addMoreDays(invoice.subscription.frequency, new Date(invoice.createdAt))
      });
    }
  }

  private async shouldMarkInvoiceAsPaied(invoice: IInvoice) {
    if (invoice.status === EnInvoiceStatus.forced) {
      return { newStatus: EnInvoiceStatus.forced, metadata: null, shouldMarkAsPaied: true };
    }

    // if (ENV === 'development') {
    //   return [invoice.status, false];
    // }

    const gatewayReturn = await this.coinbaseProvider.showCharge(invoice.metadata.code);

    const amountReceived = gatewayReturn.payments.reduce((acc, curr) => acc + parseFloat(curr.value.local.amount), 0);

    const lastTimeline = gatewayReturn.timeline[gatewayReturn.timeline.length - 1].status;

    if (!amountReceived || lastTimeline !== 'COMPLETED') {
      return { newStatus: invoice.status, metadata: gatewayReturn, shouldMarkAsPaied: false };
    }

    const priceFiat = invoice?.priceFiat || parseFloat(invoice.pricing.local.amount);

    if (amountReceived >= priceFiat) {
      return { newStatus: EnInvoiceStatus.completed, metadata: gatewayReturn, shouldMarkAsPaied: true };
    }

    if (amountReceived > 0 && amountReceived < priceFiat) {
      return { newStatus: EnInvoiceStatus.underpaid, metadata: gatewayReturn, shouldMarkAsPaied: false };
    }

    return { newStatus: invoice.status, metadata: gatewayReturn, shouldMarkAsPaied: false };
  }
}
