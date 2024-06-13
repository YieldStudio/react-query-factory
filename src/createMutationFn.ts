import { getAxiosInstance } from './axios';
import type { MutationFunction } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import type { ZodTypeAny, z } from 'zod';
import type { ApiResponse, HttpMethod } from './type';

type MutationUrlParamsType<TVariables> = TVariables extends { params: unknown } | { params?: unknown }
  ? TVariables['params']
  : unknown;

export function createMutationFn<TVariables = void, TSchema extends ZodTypeAny = ZodTypeAny>(
  method: HttpMethod,
  url: string | ((params: MutationUrlParamsType<TVariables>) => string),
  schema?: TSchema,
  options?: Omit<AxiosRequestConfig, 'method' | 'transformResponse' | 'url' | 'data'>
): MutationFunction<z.infer<TSchema>, TVariables> {
  return async (data: TVariables): Promise<ApiResponse<z.infer<TSchema>>> => {
    let body;
    let httpMethod = method;

    if (data instanceof FormData) {
      body = data;

      // Our API doesn't allow FormData for PATCH/PUT. We need to send make a POST request with _method field.
      body.append('_method', method);

      httpMethod = 'POST';
    } else if (data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { params, ...rest } = data;
      body = rest;
    }

    const res = await getAxiosInstance().request({
      ...options,
      method: httpMethod,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      url: typeof url === 'function' ? url(data?.params) : url,
      data: body,
    });

    if (!schema) {
      return res.data;
    }

    return schema.parseAsync(res.data);
  };
}
