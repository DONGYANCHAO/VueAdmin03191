import { alova } from '@/service-alova/request';
import type { RequestAdapter, RequestConfig, RequestInstanceConfig, RequestResult } from './types';

/* eslint-disable class-methods-use-this */
export class AlovaAdapter implements RequestAdapter {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(_config: RequestInstanceConfig) {}

  async request<R = unknown>(config: RequestConfig): Promise<RequestResult<R>> {
    const instance = alova;
    try {
      const methodInstance = instance.Get<R>(config.url, {
        params: config.params,
        headers: config.headers
      });
      const data = await methodInstance;
      return {
        data,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error
      };
    }
  }
}
