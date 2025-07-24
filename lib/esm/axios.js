"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAxiosInstance = setAxiosInstance;
exports.getAxiosInstance = getAxiosInstance;
const axios_1 = __importDefault(require("axios"));
let currentInstance;
function setAxiosInstance(axiosInstance) {
    currentInstance = axiosInstance;
}
function getAxiosInstance() {
    return currentInstance ?? axios_1.default;
}
