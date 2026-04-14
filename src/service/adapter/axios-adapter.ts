import { request as axiosRequest } from '../request';
import type { RequestAdapter, RequestConfig, RequestInstanceConfig, RequestResult } from './types';

/* eslint-disable class-methods-use-this */
export class AxiosAdapter implements RequestAdapter {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(_config: RequestInstanceConfig) {}

  async request<R = unknown>(config: RequestConfig): Promise<RequestResult<R>> {
    const result = await axiosRequest<R>({
      url: config.url,
      method: config.method,
      params: config.params,
      data: config.data,
      headers: config.headers,
      responseType: config.responseType as 'json'
    });

    return {
      data: result.data,
      error: result.error,
      response: result.response
    };
  }
}
