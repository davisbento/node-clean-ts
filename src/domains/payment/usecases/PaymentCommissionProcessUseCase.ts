import { BotSummaryUseCase } from '@/domains/bot/usecases/BotSummaryUseCase';
import { addMoreDays, addMoreHours, subtractDays } from '@/helpers/Date';
import { generateUuidV4 } from '@/helpers/GenerateHashId';
import { ICoinbaseProvider } from '@/infra/coinbase/ICoinbaseProvider';
import { EnChargeType } from '@/interfaces/ICoinbase';
import { EnInvoiceType, IGenerateInvoiceAndLogs, IInvoiceGenerate } from '@/interfaces/IInvoice';
import { IPaymentEvent, IPaymentLogs } from '@/interfaces/IPaymentEvent';
import { IInvoiceRepository } from '@/repositories/IInvoiceRepository';
import { IPaymentEventRepository } from '@/repositories/IPaymentEventRepository';
import { chain } from 'mathjs';

export class PaymentCommissionProcessUseCase {
  private jobId: string = null;

  constructor(
    private invoiceRepository: IInvoiceRepository,
    private paymentRepository: IPaymentEventRepository,
    private coinbaseProvider: ICoinbaseProvider,
    private botSummaryUseCase: BotSummaryUseCase
  ) {}

  public async process(): Promise<void> {
    const jobId = generateUuidV4();

    this.jobId = jobId;

    const payments = await this.paymentRepository.getPaymentsCommissionToProcess();

    const startedAt = new Date().toISOString();

    console.log(`[${jobId}] started at: ${startedAt}, find ${payments.length} payments`);

    let invoicesGenerated = 0;

    for (const paymentEvent of payments) {
      try {
        await this.processCommission(paymentEvent);

        invoicesGenerated++;
      } catch (err) {
        // TODO: SALVAR LOG EM ALGUM LUGAR
        console.log(`[PAYMENT-PROCESS] ERROR ON JOB ${jobId}`, err);
      }
    }

    console.log(`finished at: ${new Date().toISOString()}, generated ${invoicesGenerated} invoices`);
  }

  private async processCommission(payment: IPaymentEvent) {
    const botSummary = await this.botSummaryUseCase.summary(payment.botId, payment.userId, {
      startAt: subtractDays(360).toISOString(),
      endAt: new Date().toISOString()
    });

    if (botSummary.totalAbsoluteRevenue === 0) {
      return;
    }

    const totalProfitInCrypto = (botSummary.totalAbsoluteRevenue * payment.strategy.commissionPercent) / 100;

    if (totalProfitInCrypto === 0) {
      return;
    }

    const sumCommissionWithThisBotId = await this.invoiceRepository.sumInvoicesCommissionByUserIdBotId(
      payment.userId,
      payment.botId
    );

    const commissionCalculated = chain(totalProfitInCrypto - sumCommissionWithThisBotId)
      .round(8)
      .done();

    await this.generateInvoiceAndPaymentLogs({
      payment,
      btcAssetPrice: 0,
      priceFiat: 0,
      priceCrypto: commissionCalculated,
      frequency: payment.strategy.commissionFrequency
    });
  }

  private async generateInvoiceAndPaymentLogs(payload: IGenerateInvoiceAndLogs) {
    const { payment, frequency, btcAssetPrice, priceCrypto, priceFiat } = payload;

    const response = await this.coinbaseProvider.createCharge(
      EnChargeType.commission,
      priceFiat,
      payment.strategy.currency
    );

    const newInvoice: IInvoiceGenerate = {
      strategyId: payment.strategy._id,
      strategy: payment.strategy,
      priceFiat,
      addresses: { bitcoin: response.addresses.bitcoin },
      pricing: {
        bitcoin: { amount: priceCrypto.toString(), currency: 'BTC' }
      },
      assetPriceCreated: btcAssetPrice,
      userId: payment.userId,
      expiresAt: addMoreHours(72),
      currency: payment.strategy.currency,
      type: EnInvoiceType.performanceCommission,
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
