import { IExchangesRepository } from '@/repositories/IExchangesRepository';

export class ExchangeListByUserUseCase {
  constructor(private exchangesRepository: IExchangesRepository) {}

  public async getByUserId(userId: string) {
    const data = await this.exchangesRepository.getExchangesByUserId(userId);

    return data.map(exchange => ({
      id: exchange.id,
      name: exchange.name,
      apiKey: exchange.apiKey,
      apiSecret: exchange.apiSecret
    }));
  }
}
