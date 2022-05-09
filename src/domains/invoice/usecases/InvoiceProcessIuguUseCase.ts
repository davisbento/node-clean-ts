import { IIuguProvider } from '@/infra/iugu/IIuguProvider';
import { EnInvoiceStatus } from '@/interfaces/IInvoice';
import { IInvoiceRepository } from '@/repositories/IInvoiceRepository';
import { IUserRepository } from '@/repositories/IUserRepository';

export class InvoiceProcessIuguUseCase {
  constructor(
    private invoiceRepository: IInvoiceRepository,
    private userRepository: IUserRepository,
    private iuguProvider: IIuguProvider
  ) {}

  public async process(): Promise<void> {
    const invoices = await this.invoiceRepository.getInvoicesAwaitingConfirmation();

    for (const invoice of invoices) {
      try {
        const iuguInvoice = await this.iuguProvider.getInvoiceByIuguInvoiceId(invoice.idIugu);

        if (!iuguInvoice) {
          continue;
        }

        if (iuguInvoice.status === 'paid') {
          await this.invoiceRepository.markAsPaid(invoice.id, EnInvoiceStatus.completed);
          await this.userRepository.updateUser(invoice.userId, {
            iuguSubscriptionId: iuguInvoice.iuguSubscriptionId,
            subscription: invoice.subscription,
            hasPaiedSubscription: true
          });
          console.log('Invoice paid', invoice.id);
          continue;
        }

        if (iuguInvoice.status === 'canceled') {
          await this.invoiceRepository.changeStatus(invoice.id, EnInvoiceStatus.canceled);
          console.log('Invoice canceled', invoice.id);
          continue;
        }
      } catch (err) {
        console.log('error processing invoice:', invoice.id, err);
        continue;
      }
    }

    return;
  }
}
