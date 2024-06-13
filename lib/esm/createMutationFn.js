"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMutationFn = void 0;
const axios_1 = require("./axios");
function createMutationFn(method, url, schema, options) {
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
        const res = await (0, axios_1.getAxiosInstance)().request({
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
        return schema.parseAsync(res.data);
    };
}
exports.createMutationFn = createMutationFn;
