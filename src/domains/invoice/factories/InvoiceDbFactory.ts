import { Invoice } from '@/entities/Invoice';
import { DbInvoiceRepository } from '@/repositories/implementations/DbInvoiceRepository';

export const makeInvoiceDb = () => {
  const invoiceRepository = new DbInvoiceRepository(Invoice);

  return invoiceRepository;
};
