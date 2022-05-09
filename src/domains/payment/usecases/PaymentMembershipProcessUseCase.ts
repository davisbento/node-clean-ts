import { addMoreDays, addMoreHours } from '@/helpers/Date';
import { generateUuidV4 } from '@/helpers/GenerateHashId';
import { ICoinbaseProvider } from '@/infra/coinbase/ICoinbaseProvider';
import { EnChargeType } from '@/interfaces/ICoinbase';
import { EnInvoiceType, IGenerateInvoiceAndLogs, IInvoiceGenerate } from '@/interfaces/IInvoice';
import { IPaymentEvent, IPaymentLogs } from '@/interfaces/IPaymentEvent';
import { IInvoiceRepository } from '@/repositories/IInvoiceRepository';
import { IPaymentEventRepository } from '@/repositories/IPaymentEventRepository';

export class PaymentMembershipProcessUseCase {
  private jobId: string = null;

  constructor(
    private invoiceRepository: IInvoiceRepository,
    private paymentRepository: IPaymentEventRepository,
    private coinbaseProvider: ICoinbaseProvider
  ) {}

  public async process(): Promise<void> {
    const jobId = generateUuidV4();

    this.jobId = jobId;

    const payments = await this.paymentRepository.getPaymentsMembershipToProcess();

    const startedAt = new Date().toISOString();

    console.log(`[${jobId}] started at: ${startedAt}, find ${payments.length} payments`);

    let invoicesGenerated = 0;

    for (const paymentEvent of payments) {
      try {
        await this.processMembership(paymentEvent);

        invoicesGenerated++;
      } catch (err) {
        // TODO: SALVAR LOG EM ALGUM LUGAR
        console.log(`[PAYMENT-PROCESS] ERROR ON JOB ${jobId}`, err);
      }
    }

    console.log(`finished at: ${new Date().toISOString()}, generated ${invoicesGenerated} invoices`);
  }

  private async processMembership(payment: IPaymentEvent) {
    await this.generateInvoiceAndPaymentLogs({
      payment,
      btcAssetPrice: 0,
      priceCrypto: 0,
      priceFiat: payment.strategy.membershipPrice,
      frequency: payment.strategy.membershipFrequency
    });
  }

  private async generateInvoiceAndPaymentLogs(payload: IGenerateInvoiceAndLogs) {
    const { payment, frequency, btcAssetPrice, priceFiat } = payload;

    const response = await this.coinbaseProvider.createCharge(
      EnChargeType.membership,
      priceFiat,
      payment.strategy.currency
    );

    const newInvoice: IInvoiceGenerate = {
      strategyId: payment.strategy._id,
      strategy: payment.strategy,
      addresses: response.addresses,
      priceFiat,
      pricing: response.pricing,
      assetPriceCreated: btcAssetPrice,
      userId: payment.userId,
      expiresAt: addMoreHours(72),
      currency: payment.strategy.currency,
      type: EnInvoiceType.membership,
      isFirstInvoice: false
    };

    const invoiceCreated = await this.invoiceRepository.saveInvoice(newInvoice);

    const nextCharge = addMoreDays(frequency);

    const paymentLog: IPaymentLogs = {
      invoiceId: invoiceCreated._id,
      chargeDateAfter: nextCharge,
      chargeDateBefore: payment.chargeDate,
      executionDate: new Date(),
      jobId: this.jobId
    };

    await this.paymentRepository.setNextCharge(payment._id, nextCharge, paymentLog);
  }
}
