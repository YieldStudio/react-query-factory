"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmptyEntries = void 0;
function deleteEmptyEntries(obj, nullAsEmpty = false) {
    const output = { ...obj };
    Object.keys(output).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (output[key] === undefined || output[key]?.length === 0 || (nullAsEmpty && output[key] === null)) {
            delete output[key];
        }
    });
    return output;
}
exports.deleteEmptyEntries = deleteEmptyEntries;
