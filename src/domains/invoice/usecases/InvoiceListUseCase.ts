import { IInvoiceList } from '@/interfaces/IInvoice';
import { IInvoiceRepository } from '@/repositories/IInvoiceRepository';

export class InvoiceListUseCase {
  constructor(private invoiceRepository: IInvoiceRepository) {}

  public async list(userId: string): Promise<IInvoiceList[]> {
    return this.invoiceRepository.getInvoicesByUserId(userId);
  }
}
