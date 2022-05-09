import * as yup from 'yup';

export interface IConfirmEmail {
  token: string;
}
export interface IAUthenticateParams {
  email: string;
  password: string;
  otpCode?: string;
}

export const authenticateDTO = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(5),
  otpCode: yup.string().optional().nullable()
});
