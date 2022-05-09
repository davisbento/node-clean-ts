import { IuguInvoiceStatus } from '@/interfaces/IInvoice';
import { ICreatePlan } from '@/interfaces/IIugu';

export interface IIuguProvider {
  createPlan(model: ICreatePlan): Promise<any>;
  upgradePlan(
    id: string,
    subscriptionId: string
  ): Promise<{ price: number; iuguInvoiceId: string; secureUrl: string; status: IuguInvoiceStatus }>;
  getAllPlans(): Promise<any>;
  getInvoiceByIuguInvoiceId(iuguInvoiceId: string): Promise<{ status: string; id: string; iuguSubscriptionId: string }>;
  getSubscriptionIuguSubscriptionId(id: string): Promise<any>;
  createPaymentMethod(customerId: string, description: string, cardToken: string): Promise<any>;
  createCustomer(name: string, email: string): Promise<any>;
  createSubscription(
    subscriptionId: string,
    userId: string,
    invoiceId: string
  ): Promise<{ id: string; recent_invoices: { id: string }[] }>;
}
