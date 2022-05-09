import { IHttpResponse } from './IHttp';

export interface IMiddleware<T = any> {
  handle: (httpRequest: T) => Promise<IHttpResponse>;
}
