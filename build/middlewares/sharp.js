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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const handleErrors_1 = require("../utils/handleErrors");
const resizeImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const imageName = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
        yield (0, sharp_1.default)(imagePath).resize(350).toFile(`./public/resized/${imageName}`);
        return next();
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.resizeImage = resizeImage;
