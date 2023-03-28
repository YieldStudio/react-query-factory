import type { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import type { ZodTypeAny, z } from 'zod';
export declare function createQueryFn<TSchema extends ZodTypeAny>(schema: TSchema, options?: Omit<AxiosRequestConfig, 'method' | 'url'>): ({ queryKey, pageParam, }: QueryFunctionContext<QueryKey, number | string>) => Promise<z.infer<TSchema>>;
//# sourceMappingURL=createQueryFn.d.ts.map