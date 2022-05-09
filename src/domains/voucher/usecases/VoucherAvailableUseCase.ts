import { IVoucherRepository } from '@/repositories/IVoucherRepository';

export class GetVouchersAvaiableUseCase {
  constructor(private readonly voucherRepository: IVoucherRepository) {}

  public async getAvailables(userId: string) {
    const data = await this.voucherRepository.getByUserId(userId);

    if (data.length === 0) {
      return [];
    }

    const vouchers = data.reduce((prev: string[], curr) => {
      if (!curr.strategyId) {
        return prev;
      }

      if (prev.some((item: string) => item === curr.strategyId.toString())) {
        return prev;
      }

      return [...prev, curr.strategyId.toString()];
    }, []);

    return vouchers;
  }
}
