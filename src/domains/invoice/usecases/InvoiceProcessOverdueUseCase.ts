import { IInvoice } from '@/interfaces/IInvoice';
import { IInvoiceRepository } from '@/repositories/IInvoiceRepository';
import { IUserRepository } from '@/repositories/IUserRepository';

export class InvoiceProcessOverdueUseCase {
  constructor(private invoiceRepository: IInvoiceRepository, private userRepository: IUserRepository) {}

  public async process(): Promise<void> {
    const invoices = await this.invoiceRepository.getInvoicesSubscriptionOverdue();

    const startedAt = new Date().toISOString();
    let invoicesProcessedSuccessfully = 0;
    let invoicesProcessedWithError = 0;

    console.log(`started at: ${startedAt}, find ${invoices.length} invoices`);

    for (const invoice of invoices) {
      try {
        await this.processSubscriptionOverdue(invoice);
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

  private async processSubscriptionOverdue(invoice: IInvoice) {
    await this.userRepository.updateUser(invoice.userId, {
      hasPaiedSubscription: false
    });
  }
}
