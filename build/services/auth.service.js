"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyUser = exports.loginUser = void 0;
const mongoose_1 = require("../mongoose");
const jwt_1 = require("../middlewares/jwt");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const mode = process.env.APP_MODE;
console.log({ mode });
const loginUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(403);
        }
        const login = yield mongoose_1.userModel.find({ email, password });
        if (login.length > 0) {
            const token = (0, jwt_1.generateToken)({ email });
            return res.send({ token });
        }
        return res.sendStatus(404);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.loginUser = loginUser;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (mode == "testing")
            return next();
        const header = req.headers.authorization;
        if (header) {
            const token = header.split(" ")[1];
            const decoded = (0, jwt_1.verifyToken)(token);
            if (!decoded) {
                return res.sendStatus(403);
            }
            const verify = yield mongoose_1.userModel.findOne({ email: decoded.email });
            if (verify)
                return next();
            return res.sendStatus(403);
        }
        return res.sendStatus(403);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.verifyUser = verifyUser;
