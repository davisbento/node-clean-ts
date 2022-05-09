import * as yup from 'yup';

export interface IExchangesCreate {
  name: string;
  apiKey: string;
  apiSecret: string;
}

export const exchangesCreateDTO = yup.object({
  name: yup.string().required(),
  apiKey: yup.string().required(),
  apiSecret: yup.string().required()
});
