import { has } from 'lodash';

export const formatError = (error: any) => {
  if (has(error, 'errors')) {
    const { errors } = error;
    let errorArray: any[] = [];
    Object.keys(errors).map(key => {
      errorArray = [
        ...errorArray,
        {
          path: key,
          message: errors[key].message
        }
      ];
    });

    return errorArray;
  }

  return error;
};
