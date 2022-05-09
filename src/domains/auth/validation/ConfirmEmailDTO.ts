import * as yup from 'yup';

export const confirmEmailDTO = yup.object({
  token: yup.string().required()
});
