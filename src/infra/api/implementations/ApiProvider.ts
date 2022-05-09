import axios, { AxiosError, AxiosResponse, Method } from 'axios';

import { IApiProvider } from '../IApiProvider';

export class ApiProvider implements IApiProvider {
  constructor(private baseUrl: string) {}

  public async get<T>(url: string, params: any, token?: string): Promise<T> {
    const response = await this.request<T>('GET', url, params, token);

    return response.data;
  }

  public async post<T>(url: string, params: any, token?: string): Promise<T> {
    const response = await this.request<T>('POST', url, params, token);

    return response.data;
  }

  public async put<T>(url: string, params: any, token?: string): Promise<T> {
    const response = await this.request<T>('PUT', url, params, token);

    return response.data;
  }

  private async request<T = any>(
    method: Method,
    url: string,
    data: any = null,
    token: string = null
  ): Promise<AxiosResponse<T>> {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      const response = await axios.request({
        baseURL: this.baseUrl,
        url,
        method,
        timeout: 30000,
        headers: {
          'Content-type': 'application/json',
          ...headers
        },
        params: method === 'GET' ? data : null,
        data: method !== 'GET' ? data : null
      });

      return response;
    } catch (err) {
      const error: AxiosError = err;
      throw error.response;
    }
  }
}
