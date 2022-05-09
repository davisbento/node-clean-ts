import { IPhone } from '@/interfaces/IPhone';

export const phoneFormat = (phone: string): IPhone => {
  const splitPhone = phone.split(' ');

  if (phone.includes('(') && phone.includes(')')) {
    const [cc, areaCode, ...number] = splitPhone;

    const removeParentheses = areaCode.replace('(', '').replace(')', '');

    return {
      cc: Number(cc),
      areaCode: Number(removeParentheses),
      number: Number(number.join('').replace('-', ''))
    };
  }

  const [cc, ...number] = splitPhone;

  return {
    cc: Number(cc),
    areaCode: null,
    number: Number(number.join('').replace('-', ''))
  };
};
