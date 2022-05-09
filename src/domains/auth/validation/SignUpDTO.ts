import { IPhone } from '@/interfaces/IPhone';
import * as yup from 'yup';

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
  phone: IPhone;
  otpSecret: string;
  otpImageUrl: string;
  userSponsorId?: string;
}

export interface ISignUpParams {
  name: string;
  email: string;
  password: string;
  phone: string;
  sponsor?: string;
}

export const signUpDTO = yup.object({
  name: yup.string().required().min(3),
  phone: yup.string().required(),
  email: yup.string().required().email(),
  sponsor: yup.string().optional().nullable(),
  password: yup.string().required().min(8, 'Min 8 characters')
});
