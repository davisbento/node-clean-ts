import { ICoinbaseProvider } from '@/infra/coinbase/ICoinbaseProvider';
import { EnInvoiceStatus, IInvoice } from '@/interfaces/IInvoice';
import { IInvoiceRepository } from '@/repositories/IInvoiceRepository';

export class InvoiceCommissionProcessUseCase {
  constructor(private invoiceRepository: IInvoiceRepository, private coinbaseProvider: ICoinbaseProvider) {}

  public async process(): Promise<void> {
    const invoices = await this.invoiceRepository.getInvoicesToProcessWithCommission();

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

  private async shouldMarkInvoiceAsPaied(invoice: IInvoice) {
    if (invoice.status === EnInvoiceStatus.forced) {
      return { newStatus: EnInvoiceStatus.forced, metadata: null, shouldMarkAsPaied: true };
    }

    // if (ENV === 'development') {
    //   return [invoice.status, false];
    // }

    const gatewayReturn = await this.coinbaseProvider.showCharge(invoice.metadata.code);

    const amountReceived = gatewayReturn.payments.reduce((acc, curr) => acc + parseFloat(curr.value.local.amount), 0);

    if (!amountReceived) {
      return { newStatus: invoice.status, metadata: gatewayReturn, shouldMarkAsPaied: false };
    }

    const priceCrypto = parseFloat(invoice.pricing.bitcoin.amount);

    if (amountReceived >= priceCrypto) {
      return { newStatus: EnInvoiceStatus.completed, metadata: gatewayReturn, shouldMarkAsPaied: true };
    }

    if (amountReceived > 0 && amountReceived < priceCrypto) {
      return { newStatus: EnInvoiceStatus.underpaid, metadata: gatewayReturn, shouldMarkAsPaied: false };
    }

    return { newStatus: invoice.status, metadata: gatewayReturn, shouldMarkAsPaied: false };
  }
}
