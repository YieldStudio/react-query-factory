import type { QueryFunction, QueryKey } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import type { ZodTypeAny, z } from 'zod';
export declare function createQueryFn<TSchema extends ZodTypeAny>(schema: TSchema, options?: Omit<AxiosRequestConfig, 'method' | 'url'>): QueryFunction<z.infer<TSchema>, QueryKey, number | string>;
//# sourceMappingURL=createQueryFn.d.ts.map