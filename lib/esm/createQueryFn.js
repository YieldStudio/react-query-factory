import { stringify } from 'qs';
import { deleteEmptyEntries } from './utils/deleteEmptyEntries';
import { getAxiosInstance } from './axios';
function determineEndpointFromQueryKey(queryKey, pageParam) {
    const queryStringObj = queryKey.find((item) => typeof item === 'object') ?? {};
    const paginationKey = typeof pageParam === 'string' ? 'cursor' : 'page';
    if (pageParam && queryStringObj) {
        queryStringObj[paginationKey] = pageParam;
    }
    const queryString = Object.keys(queryStringObj).length > 0
        ? stringify(deleteEmptyEntries(queryStringObj), {
            arrayFormat: 'brackets',
            encode: false,
            addQueryPrefix: true,
        })
        : '';
    const url = queryKey.filter((item) => typeof item !== 'object').join('/') + queryString;
    return url.startsWith('/') ? url : `/${url}`;
}
export function createQueryFn(schema, options) {
    return async ({ queryKey, pageParam, }) => {
        const response = await getAxiosInstance().request({
            method: 'GET',
            url: determineEndpointFromQueryKey(queryKey, pageParam),
            ...options,
        });
        return schema.parse(response.data);
    };
}
