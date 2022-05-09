import { IController } from '@/interfaces/IController';

import { VoucherAvaiableController } from '../controllers/VoucherAvailableController';
import { GetVouchersAvaiableUseCase } from '../usecases/VoucherAvailableUseCase';
import { makeVoucherDb } from './VoucherDbFactory';

export const makeVoucherAvailableController = (): IController => {
  const voucherRepository = makeVoucherDb();
  const vouchersAvailableUseCase = new GetVouchersAvaiableUseCase(voucherRepository);
  const voucherAvaiableController = new VoucherAvaiableController(vouchersAvailableUseCase);

  return voucherAvaiableController;
};
