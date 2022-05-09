export interface IApiProvider {
  get<T>(url: string, params?: any, token?: string): Promise<T>;
  post<T>(url: string, params?: any, token?: string): Promise<T>;
  put<T>(url: string, params?: any, token?: string): Promise<T>;
}
