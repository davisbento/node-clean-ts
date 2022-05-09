import * as yup from 'yup';

export interface ICreateBot {
  secret: string;
  key: string;
  name: string;
  strategyId: string;
}

export const createBotDTO = yup.object({
  secret: yup.string().required(),
  key: yup.string().required(),
  name: yup.string().required(),
  strategyId: yup.string().required()
});
