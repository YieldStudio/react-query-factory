import axios from 'axios';
let currentInstance;
export function setAxiosInstance(axiosInstance) {
    currentInstance = axiosInstance;
}
export function getAxiosInstance() {
    return currentInstance ?? axios;
}
