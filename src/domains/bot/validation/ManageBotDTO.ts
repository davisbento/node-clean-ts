import * as yup from 'yup';

export const botManageDTO = yup.object({
  id: yup.string().required()
});
