"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizeRouter = exports.modelRouter = void 0;
const express_1 = __importDefault(require("express"));
const inventory_service_1 = require("../services/inventory.service");
const auth_service_1 = require("../services/auth.service");
exports.modelRouter = express_1.default.Router();
exports.sizeRouter = express_1.default.Router();
exports.modelRouter.post("/", auth_service_1.verifyUser, inventory_service_1.addModel);
exports.modelRouter.put("/", auth_service_1.verifyUser, inventory_service_1.editModel);
exports.modelRouter.delete("/:id", auth_service_1.verifyUser, inventory_service_1.deleteModelById);
exports.sizeRouter.post("/", auth_service_1.verifyUser, inventory_service_1.addSize);
exports.sizeRouter.put("/", auth_service_1.verifyUser, inventory_service_1.editSize);
exports.sizeRouter.delete("/:id", auth_service_1.verifyUser, inventory_service_1.deleteSizeById);
