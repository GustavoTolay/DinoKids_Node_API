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
exports.deleteSizeById = exports.editSize = exports.addSize = exports.deleteModelById = exports.editModel = exports.addModel = void 0;
const handleErrors_1 = require("../utils/handleErrors");
const mongoose_1 = require("../mongoose");
const addModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { model, product_id } = req.body;
        const addModel = yield mongoose_1.inventoryModel.create(model);
        const editProduct = yield mongoose_1.productModel.findByIdAndUpdate(product_id, {
            $push: { inventory: { _id: addModel._id } },
        }, { new: true });
        if (editProduct)
            return res.send(addModel);
        return res.sendStatus(404);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.addModel = addModel;
const editModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const model = req.body;
        const { _id } = model, query = __rest(model, ["_id"]);
        const editModel = yield mongoose_1.inventoryModel.findByIdAndUpdate(_id, query, {
            new: true,
        });
        if (editModel)
            return res.send(editModel);
        return res.sendStatus(404);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.editModel = editModel;
const deleteModelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteModel = yield mongoose_1.inventoryModel.findByIdAndDelete(id);
        if (!deleteModel)
            return res.sendStatus(404);
        const sizeList = deleteModel.sizes.map((size) => __awaiter(void 0, void 0, void 0, function* () {
            const deleteSize = yield mongoose_1.sizeModel.findByIdAndDelete(size._id);
            return deleteSize;
        }));
        const resolvedSizes = yield Promise.all(sizeList);
        return res.send({ deleteModel, resolvedSizes });
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.deleteModelById = deleteModelById;
const addSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { size, model_id } = req.body;
        const addSize = yield mongoose_1.sizeModel.create(size);
        const editModel = yield mongoose_1.inventoryModel.findByIdAndUpdate(model_id, { $push: { sizes: { _id: addSize._id } } }, { new: true });
        if (editModel)
            return res.send(addSize);
        return res.sendStatus(404);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.addSize = addSize;
const editSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const size = req.body;
        const { _id } = size, query = __rest(size, ["_id"]);
        const editSize = yield mongoose_1.sizeModel.findByIdAndUpdate(size._id, query, {
            new: true,
        });
        if (editSize)
            return res.send(editSize);
        return res.sendStatus(404);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.editSize = editSize;
const deleteSizeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteSize = yield mongoose_1.sizeModel.findByIdAndDelete(id);
        if (deleteSize)
            return res.send(deleteSize);
        return res.sendStatus(404);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.deleteSizeById = deleteSizeById;
