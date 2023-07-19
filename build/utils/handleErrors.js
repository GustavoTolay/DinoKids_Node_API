"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
function handleError(error, res) {
    let errorMessage = "unknown error";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    console.log(errorMessage);
    return res.status(500).send(errorMessage);
}
exports.handleError = handleError;
