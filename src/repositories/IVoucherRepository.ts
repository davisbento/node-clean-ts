import { IStrategyWithoutRevenues } from '@/interfaces/IStrategy';
import { IVoucher } from '@/interfaces/IVoucher';

export interface IVoucherRepository {
  createManyVoucher(quantity: number, userId: string, strategy: IStrategyWithoutRevenues): Promise<void>;
  getByUserIdAndStrategyId(userId: string, strategyId: string): Promise<IVoucher>;
  getByUserId(userId: string): Promise<IVoucher[]>;
  markAsUsed(voucherId: string): Promise<IVoucher>;
}
