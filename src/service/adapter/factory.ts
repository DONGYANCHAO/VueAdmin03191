import type { RequestAdapter, RequestClientType, RequestInstanceConfig } from './types';
import { AxiosAdapter } from './axios-adapter';
import { AlovaAdapter } from './alova-adapter';

export function createRequestAdapter(clientType: RequestClientType, config: RequestInstanceConfig): RequestAdapter {
  const adapterMap: Record<RequestClientType, new (config: RequestInstanceConfig) => RequestAdapter> = {
    axios: AxiosAdapter,
    alova: AlovaAdapter,
    ofetch: AxiosAdapter
  };

  const AdapterClass = adapterMap[clientType];
  return new AdapterClass(config);
}

export function getServiceBaseURL() {
  const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
  const baseURL = isHttpProxy ? '/api' : import.meta.env.VITE_SERVICE_BASE_URL;
  const otherBaseURL = {
    demo: import.meta.env.VITE_SERVICE_DEMO_URL
  };

  return { baseURL, otherBaseURL };
}
