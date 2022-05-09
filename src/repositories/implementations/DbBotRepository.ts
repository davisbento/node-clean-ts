import { Bot } from '@/entities/Bot';
import { EnBotStatus, IBot, IBotList } from '@/interfaces/IBot';
import { Types } from 'mongoose';

import { IBotRepository } from '../IBotRepository';

export class DbBotRepository implements IBotRepository {
  constructor(private readonly botModel: typeof Bot) {}

  public async findByIdAndUserId(id: string, userId: string): Promise<IBot> {
    return this.botModel.findOne({ _id: Types.ObjectId(id), userId });
  }

  public async getById(id: string): Promise<IBot> {
    return this.botModel.findById(id);
  }

  public async getAll(): Promise<IBot[]> {
    return this.botModel.find({ status: { $nin: [EnBotStatus.deleted] } });
  }

  public async getAllByUserId(userId: string): Promise<IBotList[]> {
    const botProjection = {
      _id: 1,
      name: 1,
      status: 1,
      createdAt: 1,
      strategyId: 1,
      strategyName: 1
    };

    const bots: IBot[] = await this.botModel.find({ userId, status: { $nin: [EnBotStatus.deleted] } }, botProjection);

    if (bots.length === 0) {
      return [];
    }

    return bots.map(bot => ({
      id: bot._id,
      name: bot.name,
      status: bot.status,
      strategyId: bot.strategyId,
      strategyName: bot.strategyName,
      createdAt: bot.createdAt
    }));
  }

  public async updateBot(id: string, bot: Partial<IBot>) {
    return this.botModel.findByIdAndUpdate(id, { ...bot });
  }

  public async saveBot(params: any): Promise<IBot> {
    const bot = new Bot({ ...params });

    const response = await bot.save();

    return response;
  }
}
