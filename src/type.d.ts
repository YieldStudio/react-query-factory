import type { AxiosResponse, Method } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse<T = any> = Omit<AxiosResponse<T>, 'config' | 'statusText' | 'request'>;

export type HttpMethod = Method;
