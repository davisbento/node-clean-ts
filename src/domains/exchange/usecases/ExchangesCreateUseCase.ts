import BadRequestException from '@/exceptions/BadRequestException';
import { IExchangesRepository } from '@/repositories/IExchangesRepository';
import { IUserRepository } from '@/repositories/IUserRepository';
import { IExchangesCreate } from '../validation/ExchangesCreateDTO';

export class ExchangeCreateUseCase {
  constructor(private exchangesRepository: IExchangesRepository, private readonly userRepository: IUserRepository) {}

  public async create(model: IExchangesCreate, userId: string) {
    const user = await this.userRepository.getById(userId);

    const exchangePerUser = user.subscription.exchanges;

    const numberOfExchanges = await this.exchangesRepository.getExchangesByUserId(userId);

    if (numberOfExchanges.length >= exchangePerUser) {
      throw new BadRequestException('Your subscription has reached the maximum number of exchanges');
    }

    await this.exchangesRepository.save(model, userId);
    return { message: 'Exchange created' };
  }
}
