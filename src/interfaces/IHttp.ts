export interface IHttpRequest {
  body: any;
  params: any;
  query: any;
  userId?: string;
}

export interface IHttpResponse {
  data: any;
  statusCode: any;
}
