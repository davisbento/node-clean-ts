import { EnInvoiceType } from './IInvoice';

export interface IPayloadMessage {
  userId: string;
  itemId: string;
  type: EnInvoiceType;
  valueInBtc: number;
}
