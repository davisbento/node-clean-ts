import { addMoreDays } from '@/helpers/Date';
import { ICoinbaseProvider } from '@/infra/coinbase/ICoinbaseProvider';
import { EnInvoiceStatus, EnInvoiceType, IInvoice } from '@/interfaces/IInvoice';
import { EnPaymentType } from '@/interfaces/IPaymentEvent';
import { EnChargeFrequency } from '@/interfaces/IStrategy';
import { IInvoiceRepository } from '@/repositories/IInvoiceRepository';
import { IPaymentEventRepository } from '@/repositories/IPaymentEventRepository';
import { IUserRepository } from '@/repositories/IUserRepository';
import { IVoucherRepository } from '@/repositories/IVoucherRepository';

export class InvoiceProcessStrategyUseCase {
  constructor(
    private invoiceRepository: IInvoiceRepository,
    private coinbaseProvider: ICoinbaseProvider,
    private voucherRepository: IVoucherRepository,
    private paymentEventRepository: IPaymentEventRepository,
    private userRepository: IUserRepository
  ) {}

  public async process(): Promise<void> {
    const invoices = await this.invoiceRepository.getInvoicesToProcessWithStrategies();

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
        await this.generateVoucherAndStrategy(invoice);
        await this.generatePaymentEvent(invoice);
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

  private async generateVoucherAndStrategy(invoice: IInvoice) {
    // apenas gera voucher e adiciona a estrategia se a fatura for do tipo de compra de estratégia
    if (invoice.type !== EnInvoiceType.strategyPurchase) {
      return;
    }

    await this.voucherRepository.createManyVoucher(1, invoice.userId, invoice.strategy);

    await this.userRepository.addStrategy(invoice.userId, {
      invoiceId: invoice._id,
      strategy: invoice.strategy
    });
  }

  private async generatePaymentEvent(invoice: IInvoice) {
    // apenas gera evento de pagamento se a fatura for do tipo de compra de estratégia ou compra de assinatura
    if (invoice.type === EnInvoiceType.membership || invoice.type === EnInvoiceType.subscription) {
      return;
    }

    // se for pagamento unico, não gera evento de cobrança recorrente
    if (invoice.strategy.membershipFrequency === EnChargeFrequency.unique) {
      return;
    }

    await this.processStrategy(invoice);
  }

  private async processStrategy(invoice: IInvoice) {
    await this.paymentEventRepository.saveEvent({
      strategyId: invoice.strategy._id,
      strategy: invoice.strategy,
      userId: invoice.userId,
      paymentType: EnPaymentType.membership,
      chargeDate: addMoreDays(invoice.strategy.membershipFrequency, new Date(invoice.createdAt))
    });
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
