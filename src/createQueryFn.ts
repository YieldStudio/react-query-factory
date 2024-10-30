import { stringify } from 'qs';
import { deleteEmptyEntries } from './utils/deleteEmptyEntries';
import { getAxiosInstance } from './axios';
import type { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import type { ZodTypeAny, z } from 'zod';

type QueryKeyObject = Record<string, string | number>;

function determineEndpointFromQueryKey(queryKey: QueryKey, pageParam?: number | string) {
  const queryStringObj = (queryKey.find((item) => typeof item === 'object') as QueryKeyObject | undefined) ?? {};

  const paginationKey = typeof pageParam === 'string' ? 'cursor' : 'page';
  if (pageParam && queryStringObj) {
    queryStringObj[paginationKey] = pageParam;
  }

  const queryString =
    Object.keys(queryStringObj).length > 0
      ? stringify(deleteEmptyEntries(queryStringObj), { arrayFormat: 'brackets', encode: false, addQueryPrefix: true })
      : '';

  const url = queryKey.filter((item) => typeof item !== 'object').join('/') + queryString;

  return url.startsWith('/') ? url : `/${url}`;
}

export function createQueryFn<TSchema extends ZodTypeAny>(
  schema: TSchema,
  options?: Omit<AxiosRequestConfig, 'method' | 'url'>
) {
  return async ({
    queryKey,
    pageParam,
  }: QueryFunctionContext<QueryKey, number | string>): Promise<z.infer<TSchema>> => {
    const response = await getAxiosInstance().request({
      method: 'GET',
      url: determineEndpointFromQueryKey(queryKey, pageParam),
      ...options,
    });

    return schema.parseAsync(response.data);
  };
}
