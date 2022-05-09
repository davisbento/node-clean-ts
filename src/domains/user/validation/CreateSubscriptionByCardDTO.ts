import * as yup from 'yup';

export interface ICreateSubscriptionByCard {
  subscriptionId: string;
  invoiceId: string;
}

export const createSubscriptionByCardDTO = yup.object({
  subscriptionId: yup.string().required(),
  invoiceId: yup.string().required()
});
