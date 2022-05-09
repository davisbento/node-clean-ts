import * as yup from 'yup';

export interface ICreatePaymentMethod {
  cardToken: string;
}

export const createPaymentMethoDTO = yup.object({
  cardToken: yup.string().required()
});
