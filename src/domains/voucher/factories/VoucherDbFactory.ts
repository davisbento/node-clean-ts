import { Voucher } from '@/entities/Voucher';
import { DbVoucherRepository } from '@/repositories/implementations/DbVoucherRepository';

export const makeVoucherDb = () => {
  const voucherRepository = new DbVoucherRepository(Voucher);

  return voucherRepository;
};
