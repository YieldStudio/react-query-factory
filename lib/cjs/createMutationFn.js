"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMutationFn = void 0;
const axios_1 = require("./axios");
function createMutationFn(method, url, schema, options) {
    return (data) => __awaiter(this, void 0, void 0, function* () {
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
            const { params } = data, rest = __rest(data, ["params"]);
            body = rest;
        }
        const res = yield (0, axios_1.getAxiosInstance)().request(Object.assign(Object.assign({}, options), { method: httpMethod, 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            url: typeof url === 'function' ? url(data === null || data === void 0 ? void 0 : data.params) : url, data: body }));
        if (!schema) {
            return res.data;
        }
        return schema.parseAsync(res.data);
    });
}
exports.createMutationFn = createMutationFn;
