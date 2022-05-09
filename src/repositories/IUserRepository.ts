import { ISignUpData } from '@/domains/auth/validation/SignUpDTO';
import { IStrategyWithoutRevenues } from '@/interfaces/IStrategy';
import { IUser } from '@/interfaces/IUser';

export interface IUserRepository {
  saveUser(params: ISignUpData): Promise<IUser>;
  updateUser(id: string, user: Partial<IUser>): Promise<IUser>;
  getById(userId: string): Promise<IUser>;
  getByIdentificator(identificator: string): Promise<IUser>;
  addStrategy(userId: string, newStrategy: { strategy: IStrategyWithoutRevenues; invoiceId?: string }): Promise<void>;
  getByEmail(email: string): Promise<IUser>;
  getAll(): Promise<IUser[]>;
  addPaymentMethod(userId: string, cardToken: string, gatewayResponse: any): Promise<void>;
}
