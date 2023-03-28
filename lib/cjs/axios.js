"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosInstance = exports.setAxiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
let currentInstance;
function setAxiosInstance(axiosInstance) {
    currentInstance = axiosInstance;
}
exports.setAxiosInstance = setAxiosInstance;
function getAxiosInstance() {
    return currentInstance !== null && currentInstance !== void 0 ? currentInstance : axios_1.default;
}
exports.getAxiosInstance = getAxiosInstance;
