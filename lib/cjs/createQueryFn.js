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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueryFn = void 0;
const qs_1 = require("qs");
const deleteEmptyEntries_1 = require("./utils/deleteEmptyEntries");
const axios_1 = require("./axios");
function determineEndpointFromQueryKey(queryKey, pageParam) {
    var _a;
    const queryStringObj = (_a = queryKey.find((item) => typeof item === 'object')) !== null && _a !== void 0 ? _a : {};
    const paginationKey = typeof pageParam === 'string' ? 'cursor' : 'page';
    if (pageParam && queryStringObj) {
        queryStringObj[paginationKey] = pageParam;
    }
    const queryString = Object.keys(queryStringObj).length > 0
        ? (0, qs_1.stringify)((0, deleteEmptyEntries_1.deleteEmptyEntries)(queryStringObj), {
            arrayFormat: 'brackets',
            encode: false,
            addQueryPrefix: true,
        })
        : '';
    const url = queryKey.filter((item) => typeof item !== 'object').join('/') + queryString;
    return url.startsWith('/') ? url : `/${url}`;
}
function createQueryFn(schema, options) {
    return ({ queryKey, pageParam, }) => __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, axios_1.getAxiosInstance)().request(Object.assign({ method: 'GET', url: determineEndpointFromQueryKey(queryKey, pageParam) }, options));
        return schema.parse(response.data);
    });
}
exports.createQueryFn = createQueryFn;
