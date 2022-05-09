import { IController } from '@/interfaces/IController';
import { IHttpResponse } from '@/interfaces/IHttp';

export class HomeController implements IController {
  constructor() {}

  public async handle(): Promise<IHttpResponse> {
    return {
      data: { ok: true, now: new Date().toISOString() },
      statusCode: 200
    };
  }
}
