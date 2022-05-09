import { IBotList } from '@/interfaces/IBot';
import { IBotRepository } from '@/repositories/IBotRepository';

export class BotListUseCase {
  constructor(private botRepository: IBotRepository) {}

  public async getAll(userId: string): Promise<IBotList[]> {
    return this.botRepository.getAllByUserId(userId);
  }
}
