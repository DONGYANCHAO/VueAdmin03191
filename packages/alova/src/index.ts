import { createAlova } from 'alova';
import type { AlovaGenerics, AlovaRequestAdapter } from 'alova';
import VueHook from 'alova/vue';
import type { VueHookType } from 'alova/vue';
import adapterFetch from 'alova/fetch';
import { createServerTokenAuthentication } from 'alova/client';
import { BACKEND_ERROR_CODE } from './constant';
import type { CustomAlovaConfig, RequestOptions } from './type';

type AG = AlovaGenerics;
type DefaultRequestAdapter = AlovaRequestAdapter<AG['RequestConfig'], AG['Response'], AG['ResponseHeader']>;

export const createAlovaRequest = (customConfig: CustomAlovaConfig<AG>, options: RequestOptions<AG>) => {
  const { tokenRefresher } = options;
  const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<
    VueHookType,
    DefaultRequestAdapter
  >({
    refreshTokenOnSuccess: {
      isExpired: (response, method) => tokenRefresher?.isExpired(response, method) || false,
      handler: async (response, method) => tokenRefresher?.handler(response, method)
    },
    refreshTokenOnError: {
      isExpired: (response, method) => tokenRefresher?.isExpired(response, method) || false,
      handler: async (response, method) => tokenRefresher?.handler(response, method)
    }
  });

  const instance = createAlova({
    ...customConfig,
    timeout: customConfig.timeout ?? 10 * 1000,
    requestAdapter: (customConfig.requestAdapter as DefaultRequestAdapter) ?? adapterFetch(),
    statesHook: VueHook,
    beforeRequest: onAuthRequired(options.onRequest as (method: any) => any),
    responded: onResponseRefreshToken({
      onSuccess: async (response, method) => {
        let error: unknown = null;
        let transformedData: unknown = null;
        try {
          if (await options.isBackendSuccess(response)) {
            transformedData = await options.transformBackendResponse(response);
          } else {
            const backendError = new Error('the backend request error') as Error & { code: string };
            backendError.code = BACKEND_ERROR_CODE;
            error = backendError;
          }
        } catch (err) {
          error = err;
        }

        if (error) {
          await options.onError?.(error, response, method);
          throw error;
        }

        return transformedData;
      },
      onComplete: options.onComplete,
      onError: (error: any, method: any) => {
        options.onError?.(error, null, method);
      }
    })
  });

  return instance;
};

export { BACKEND_ERROR_CODE };
export type * from './type';
export type * from 'alova';
