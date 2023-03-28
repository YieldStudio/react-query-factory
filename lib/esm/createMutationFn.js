import { getAxiosInstance } from './axios';
export function createMutationFn(method, url, schema, options) {
    return async (data) => {
        let body;
        let httpMethod = method;
        if (data instanceof FormData) {
            body = data;
            // Our API doesn't allow FormData for PATCH/PUT. We need to send make a POST request with _method field.
            body.append('_method', method);
            httpMethod = 'POST';
        }
        else if (data) {
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
        return schema.parse(res.data);
    };
}
