import InternalServerError from '@/exceptions/InternalServerError';
import { IApiProvider } from '@/infra/api/IApiProvider';
import { IBotApiReturn } from '@/interfaces/IBotCreate';
import { IBotRepository } from '@/repositories/IBotRepository';

import { BotAuthenticateUseCase } from './BotAuthenticateUseCase';

export class BotProcessUseCase {
  constructor(
    private botRepository: IBotRepository,
    private apiProvider: IApiProvider,
    private botAuthenticateUseCase: BotAuthenticateUseCase
  ) {}

  public async process() {
    const startedAt = new Date().toISOString();
    let botsUpdated = 0;
    let botsWithError = 0;

    const bots = await this.botRepository.getAll();

    console.log(`started at: ${startedAt}, find ${bots.length} bot`);

    if (bots.length === 0) {
      return {
        botsUpdated,
        botsWithError
      };
    }

    const botApiToken = await this.botAuthenticateUseCase.authenticate();

    for (const bot of bots) {
      try {
        const findBot = await this.apiProvider.get<IBotApiReturn>('/robot', { robotId: bot.botApiId }, botApiToken);

        bot.status = findBot.robotStatus;

        await bot.save();

        botsUpdated++;
      } catch (err) {
        console.log(err);
        throw new InternalServerError(err?.response?.data?.message || 'Internal error processing bots');
      }
    }

    const jobResult = {
      startedAt,
      finishedAt: new Date().toISOString(),
      botsFound: bots.length,
      botsUpdated
    };

    console.log(`finished at: ${jobResult.finishedAt}, bots updated: ${jobResult.botsUpdated}`);

    return jobResult;
  }
}
