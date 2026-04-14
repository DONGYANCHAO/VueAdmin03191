export interface RequestAdapter<T = unknown> {
  request: <R = T>(config: RequestConfig) => Promise<RequestResult<R>>;
}

export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  responseType?: 'json' | 'blob' | 'text' | 'arraybuffer';
}

export interface RequestResult<R = unknown> {
  data: R | null;
  error: unknown;
  response?: unknown;
}

export interface RequestInstanceConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ResponseError {
  code: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  code: string;
  data: T;
  msg: string;
}

export type RequestClientType = 'axios' | 'alova' | 'ofetch';
