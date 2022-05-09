import * as yup from 'yup';

export interface IUpdateUser {
  phone?: string;
  dob?: string;
  password?: string;
  oldPassword?: string;
}

export const updateUserDTO = yup.object({
  phone: yup.string().optional().min(11),
  dob: yup.string().optional().min(10),
  oldPassword: yup.string().optional(),
  password: yup
    .string()
    .optional()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
});
