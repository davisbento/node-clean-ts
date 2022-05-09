import { Voucher } from '@/entities/Voucher';
import { IStrategyWithoutRevenues } from '@/interfaces/IStrategy';
import { IVoucher } from '@/interfaces/IVoucher';
import { Types } from 'mongoose';

import { IVoucherRepository } from '../IVoucherRepository';

export class DbVoucherRepository implements IVoucherRepository {
  constructor(private readonly voucherModel: typeof Voucher) {}

  async createManyVoucher(quantity: number, userId: string, strategy: IStrategyWithoutRevenues): Promise<void> {
    if (quantity === 0) {
      return;
    }

    const vouchersToInsert = new Array(quantity).fill({
      userId: Types.ObjectId(userId),
      strategyId: strategy._id,
      strategy: { ...strategy }
    });

    await this.voucherModel.insertMany(vouchersToInsert);
  }

  async getByUserIdAndStrategyId(userId: string, strategyId: string): Promise<IVoucher> {
    return this.voucherModel.findOne({ userId, strategyId, used: false });
  }

  async getByUserId(userId: string): Promise<IVoucher[]> {
    return this.voucherModel.find({ userId, used: false });
  }

  async markAsUsed(id: string): Promise<IVoucher> {
    return this.voucherModel.findByIdAndUpdate(id, { used: true, usedAt: new Date() });
  }
}
