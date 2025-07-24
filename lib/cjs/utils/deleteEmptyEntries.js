"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmptyEntries = deleteEmptyEntries;
function deleteEmptyEntries(obj, nullAsEmpty = false) {
    const output = Object.assign({}, obj);
    Object.keys(output).forEach((key) => {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (output[key] === undefined || ((_a = output[key]) === null || _a === void 0 ? void 0 : _a.length) === 0 || (nullAsEmpty && output[key] === null)) {
            delete output[key];
        }
    });
    return output;
}
