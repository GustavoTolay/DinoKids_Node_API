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
exports.deleteCategoryById = exports.updateCategory = exports.addCategory = exports.getAllCategories = void 0;
const mongoose_1 = require("../mongoose");
const handleErrors_1 = require("../utils/handleErrors");
const getAllCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield mongoose_1.categoryModel.find({});
        return res.send(list);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.getAllCategories = getAllCategories;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.body;
        const newCategory = new mongoose_1.categoryModel(category);
        yield newCategory.save();
        return res.send("category added");
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.addCategory = addCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.body;
        const { _id } = category, updateValues = __rest(category, ["_id"]);
        const editedCategory = yield mongoose_1.categoryModel.findByIdAndUpdate(_id, updateValues, { new: true });
        if (editedCategory)
            return res.send(editedCategory);
        return res.sendStatus(404);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.updateCategory = updateCategory;
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCategory = yield mongoose_1.categoryModel.findByIdAndDelete(id);
        if (deletedCategory)
            return res.send(deletedCategory);
        return res.sendStatus(404);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.deleteCategoryById = deleteCategoryById;
