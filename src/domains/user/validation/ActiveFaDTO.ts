import * as yup from 'yup';

export interface IActiveFa {
  secret: string;
}

export const activeFaDTO = yup.object({
  secret: yup.string().required()
});
