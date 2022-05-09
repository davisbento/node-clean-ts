import { IHttpResponse, IHttpRequest } from './IHttp';

export interface IController {
  handle: (request?: IHttpRequest) => Promise<IHttpResponse>;
}
