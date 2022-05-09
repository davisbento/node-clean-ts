import { ISignUpData } from '@/domains/auth/validation/SignUpDTO';
import { User } from '@/entities/User';
import { IStrategyWithoutRevenues } from '@/interfaces/IStrategy';
import { IUser } from '@/interfaces/IUser';

import { IUserRepository } from '../IUserRepository';

export class DbUserRepository implements IUserRepository {
  constructor(private readonly userModel: typeof User) {}

  public async getAll(): Promise<IUser[]> {
    return this.userModel.find({});
  }

  public async getById(userId: string): Promise<IUser> {
    return this.userModel.findById(userId);
  }

  public async getByIdentificator(identificator: string): Promise<IUser> {
    return this.userModel.findOne({ identificator });
  }

  public async updateUser(id: string, user: Partial<IUser>) {
    return this.userModel.findByIdAndUpdate(id, { ...user });
  }

  public async addPaymentMethod(userId: string, cardToken: string, gatewayResponse: any): Promise<void> {
    const user: IUser = await this.userModel.findById(userId);

    if (!user) {
      return null;
    }

    if (!user?.paymentMethods?.length) {
      user.paymentMethods = [];
    }

    if (!user?.cardTokens.length) {
      user.cardTokens = [];
    }

    const disablePayments = user.paymentMethods.map(paymentMethod => {
      paymentMethod.isDefault = false;

      return paymentMethod;
    });

    user.paymentMethods = [
      ...disablePayments,
      {
        ...gatewayResponse,
        isDefault: true
      }
    ];

    user.cardTokens.push(cardToken);

    await user.save();
  }

  public async addStrategy(
    userId: string,
    newStrategy: { strategy: IStrategyWithoutRevenues; invoiceId?: string }
  ): Promise<void> {
    const user = await this.userModel.findById(userId);

    user.strategies.push(newStrategy);

    await user.save();
  }

  public async saveUser(params: ISignUpData): Promise<IUser> {
    const user = new User({
      ...params,
      email: params.email.toLowerCase()
    });

    const response = await user.save();

    return response;
  }

  public async getByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({
      email: email.toLowerCase()
    });
  }
}
