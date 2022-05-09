import { IController } from '@/interfaces/IController';

import { BotProcessUseCase } from '../usecases/BotProcessUseCase';

export class BotProcessController implements IController {
  constructor(private botProcessUseCase: BotProcessUseCase) {}

  public async handle() {
    this.botProcessUseCase.process();

    return {
      data: {
        ok: true
      },
      statusCode: 200
    };
  }
}
