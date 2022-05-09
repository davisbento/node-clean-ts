import { Bot } from '@/entities/Bot';
import { DbBotRepository } from '@/repositories/implementations/DbBotRepository';

export const makeBotDb = () => {
  const botRepository = new DbBotRepository(Bot);

  return botRepository;
};
