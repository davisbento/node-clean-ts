import * as yup from 'yup';

export interface IForgotPasswordParams {
  email: string;
}

export const forgotPasswordDTO = yup.object({
  email: yup.string().required().email()
});
