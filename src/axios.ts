import axios from 'axios';
import type { AxiosInstance } from 'axios';

let currentInstance: AxiosInstance | undefined;

export function setAxiosInstance(axiosInstance: AxiosInstance): void {
  currentInstance = axiosInstance;
}

export function getAxiosInstance(): AxiosInstance {
  return currentInstance ?? axios;
}
