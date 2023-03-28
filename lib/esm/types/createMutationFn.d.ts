import type { MutationFunction } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import type { ZodTypeAny, z } from 'zod';
import type { HttpMethod } from './type';
type MutationUrlParamsType<TVariables> = TVariables extends {
    params: unknown;
} | {
    params?: unknown;
} ? TVariables['params'] : unknown;
export declare function createMutationFn<TVariables = void, TSchema extends ZodTypeAny = ZodTypeAny>(method: HttpMethod, url: string | ((params: MutationUrlParamsType<TVariables>) => string), schema?: TSchema, options?: Omit<AxiosRequestConfig, 'method' | 'transformResponse' | 'url' | 'data'>): MutationFunction<z.infer<TSchema>, TVariables>;
export {};
//# sourceMappingURL=createMutationFn.d.ts.map