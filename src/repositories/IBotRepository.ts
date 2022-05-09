import { IBot, IBotList } from '@/interfaces/IBot';

export interface IBotRepository {
  getAllByUserId(userId: string): Promise<IBotList[]>;
  getAll(): Promise<IBot[]>;
  getById(id: string): Promise<IBot>;
  findByIdAndUserId(id: string, userId: string): Promise<IBot>;
  updateBot(id: string, bot: Partial<IBot>): Promise<IBot>;
  saveBot(params: any): Promise<IBot>;
}
