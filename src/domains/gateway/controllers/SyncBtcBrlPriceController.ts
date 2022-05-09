import { IController } from '@/interfaces/IController';

import { SyncBtcBrlPriceUseCase } from '../usecases/SyncBtcBrlPriceUseCase';

export class SyncBtcBrlPriceController implements IController {
  constructor(private syncBtcBrlPriceUseCase: SyncBtcBrlPriceUseCase) {}

  public async handle() {
    await this.syncBtcBrlPriceUseCase.syncBtcBrlPrice();

    return {
      data: { ok: true },
      statusCode: 200
    };
  }
}
