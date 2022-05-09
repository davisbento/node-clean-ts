import { dateFormat } from '@/helpers/Date';
import { IIuguInvoice, IIuguRecentInvoices } from '@/interfaces/IInvoice';
import { ICreatePlan } from '@/interfaces/IIugu';
import axios, { AxiosError, Method } from 'axios';

import { IIuguProvider } from '../IIuguProvider';

export class IuguProvider implements IIuguProvider {
  public async getAllPlans(): Promise<any> {
    const response = await this.createProvider('get', 'plans', {});
    return response.data;
  }

  public async getSubscriptionIuguSubscriptionId(id: string) {
    const response = await this.createProvider<{ facets: { active: any[] } }>('get', `subscriptions/${id}`, {});

    return response.data;
  }

  public async getInvoiceByIuguInvoiceId(iuguInvoiceId: string) {
    try {
      const response = await this.createProvider<IIuguInvoice>('get', `invoices/${iuguInvoiceId}`, {});

      const subscriptionId = response.data.variables.find(variable => variable.variable === 'subscription_id')?.value;

      return {
        status: response.data?.status || null,
        id: response.data?.id || null,
        iuguSubscriptionId: subscriptionId || null
      };
    } catch (err) {
      return null;
    }
  }

  public async createSubscription(subscriptionId: string, userId: string, invoiceId: string) {
    try {
      const response = await this.createProvider<{ id: string; recent_invoices: { id: string; secure_url: string }[] }>(
        'post',
        'subscriptions',
        {
          plan_identifier: subscriptionId,
          customer_id: userId,
          expires_at: dateFormat(new Date(), 'yyyy-MM-dd'),
          custom_variables: [{ name: 'invoiceId', value: invoiceId }]
        }
      );

      return response.data;
    } catch (err) {
      const error: AxiosError = err;
      console.log(error.response.data.errors);
    }
  }
  public async createCustomer(name: string, email: string): Promise<{ id: string }> {
    try {
      const response = await this.createProvider<{ id: string }>('post', 'customers', {
        name,
        email
      });

      return response.data;
    } catch (err) {
      const error: AxiosError = err;
      console.log(error.response.data.errors);
    }
  }

  public async createPaymentMethod(customerId: string, description: string, cardToken: string): Promise<any> {
    try {
      const response = await this.createProvider('post', `customers/${customerId}/payment_methods`, {
        description,
        token: cardToken
      });

      return response.data;
    } catch (err) {
      const error: AxiosError = err;
      if (error.response.data.errors?.token) {
        throw 'Esse cartão já foi cadastrado';
      }
      console.log(error.response.data.errors);
    }
  }

  public async createPlan(model: ICreatePlan): Promise<any> {
    try {
      await this.createProvider('post', 'plans', {
        ...model,
        payable_with: ['all'],
        billing_days: 7,
        max_cycles: 0
      });
    } catch (err) {
      const error: AxiosError = err;
      console.log(error.response.data.errors);
    }
  }

  public async upgradePlan(id: string, subscriptionId: string) {
    try {
      const response = await this.createProvider<{
        price_cents: number;
        recent_invoices: Array<IIuguRecentInvoices>;
      }>('post', `subscriptions/${id}/change_plan/${subscriptionId}`, {});

      const total = response.data.recent_invoices[0].total.replace('R$ ', '');

      return {
        price: parseFloat(total),
        iuguInvoiceId: response.data.recent_invoices[0].id,
        secureUrl: response.data.recent_invoices[0].secure_url,
        status: response.data.recent_invoices[0].status
      };
    } catch (err) {
      const error: AxiosError = err;
      throw new Error(error.response.data.errors);
    }
  }
  private createProvider<T = any>(method: Method, url: string, data: any) {
    return axios.request<T>({
      method,
      baseURL: 'https://api.iugu.com/v1',
      url,
      data: method !== 'get' ? data : {},
      params:
        method === 'get' ? { api_token: process.env.IUGU_API_KEY, ...data } : { api_token: process.env.IUGU_API_KEY },
      headers: {
        // eslint-disable-next-line quote-props
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }
}
