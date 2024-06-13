"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueryFn = void 0;
const qs_1 = require("qs");
const deleteEmptyEntries_1 = require("./utils/deleteEmptyEntries");
const axios_1 = require("./axios");
function determineEndpointFromQueryKey(queryKey, pageParam) {
    const queryStringObj = queryKey.find((item) => typeof item === 'object') ?? {};
    const paginationKey = typeof pageParam === 'string' ? 'cursor' : 'page';
    if (pageParam && queryStringObj) {
        queryStringObj[paginationKey] = pageParam;
    }
    const queryString = Object.keys(queryStringObj).length > 0
        ? (0, qs_1.stringify)((0, deleteEmptyEntries_1.deleteEmptyEntries)(queryStringObj), { arrayFormat: 'brackets', encode: false, addQueryPrefix: true })
        : '';
    const url = queryKey.filter((item) => typeof item !== 'object').join('/') + queryString;
    return url.startsWith('/') ? url : `/${url}`;
}
function createQueryFn(schema, options) {
    return async ({ queryKey, pageParam, }) => {
        const response = await (0, axios_1.getAxiosInstance)().request({
            method: 'GET',
            url: determineEndpointFromQueryKey(queryKey, pageParam),
            ...options,
        });
        return schema.parseAsync(response.data);
    };
}
exports.createQueryFn = createQueryFn;
