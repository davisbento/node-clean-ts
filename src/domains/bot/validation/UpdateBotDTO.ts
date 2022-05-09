import * as yup from 'yup';

export interface IUpdateBot {
  secret?: string;
  key?: string;
  name?: string;
  id: string;
}

export const updateBotDTO = yup.object({
  secret: yup.string().optional(),
  key: yup.string().optional(),
  name: yup.string().optional(),
  id: yup.string().required()
});
