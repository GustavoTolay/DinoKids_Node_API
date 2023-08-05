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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reserveStock = exports.editProduct = exports.getProductsByCategory = exports.getProductById = exports.deleteProductById = exports.getAllProducts = exports.getAllAvailableProducts = exports.addProduct = exports.verifyStock = exports.getManyById = void 0;
const mongoose_1 = require("../mongoose");
const handleErrors_1 = require("../utils/handleErrors");
const getManyById = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idList = req.body;
        const productsList = yield mongoose_1.productModel.find({ $or: idList });
        if (productsList.length)
            return res.send(productsList);
        return res.sendStatus(404);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.getManyById = getManyById;
const verifyStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body;
        console.log(req.body);
        let sufficientStock = [];
        const sizeList = items.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const size = (yield mongoose_1.sizeModel.findById(product.id));
            sufficientStock.push(size.stock >= (product.quantity || 0));
            return size;
        }));
        const readyList = yield Promise.all(sizeList);
        console.log({ sufficientStock });
        if (sufficientStock.includes(false))
            return res.status(403).send(readyList);
        return next();
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.verifyStock = verifyStock;
const addProduct = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const product = JSON.parse(req.body.product);
        product.image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        // const product: Product = req.body.product;
        // product.image = "testString";
        const modelList = product.inventory.map((model) => __awaiter(void 0, void 0, void 0, function* () {
            const sizeList = yield mongoose_1.sizeModel.insertMany(model.sizes);
            model.sizes = sizeList.map((size) => {
                return { _id: size._id };
            });
            return model;
        }));
        const inventoryList = yield mongoose_1.inventoryModel.insertMany(yield Promise.all(modelList));
        product.inventory = inventoryList.map((model) => {
            return { _id: model._id };
        });
        const addProduct = yield mongoose_1.productModel.create(product);
        return res.send(addProduct);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.addProduct = addProduct;
const getAllAvailableProducts = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllProducts = yield mongoose_1.productModel.find({
            available: true,
        });
        return res.send(findAllProducts);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.getAllAvailableProducts = getAllAvailableProducts;
const getAllProducts = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllProducts = yield mongoose_1.productModel
            .find({})
            .populate({ path: "inventory", populate: { path: "sizes" } });
        return res.send(findAllProducts);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.getAllProducts = getAllProducts;
const deleteProductById = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield mongoose_1.productModel.findByIdAndDelete(id);
        if (!product)
            return res.sendStatus(404);
        const sizeList = product.inventory.map((model) => __awaiter(void 0, void 0, void 0, function* () {
            const query = yield mongoose_1.inventoryModel.findByIdAndDelete(model._id);
            return query.sizes;
        }));
        const resolvedSizeList = (yield Promise.all(sizeList)).flat(1);
        const sizes = resolvedSizeList.map((size) => __awaiter(void 0, void 0, void 0, function* () {
            return yield mongoose_1.sizeModel.findByIdAndDelete(size._id);
        }));
        const resolvedSizes = yield Promise.all(sizes);
        return res.send({ product, resolvedSizes });
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.deleteProductById = deleteProductById;
const getProductById = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const find = yield mongoose_1.productModel
            .findById(id)
            .populate({ path: "inventory", populate: { path: "sizes" } });
        if (find)
            return res.send(find);
        return res.sendStatus(404);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.getProductById = getProductById;
const getProductsByCategory = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const find = yield mongoose_1.productModel.find({
            category: category,
        });
        if (find)
            return res.send(find);
        return res.sendStatus(404);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.getProductsByCategory = getProductsByCategory;
const editProduct = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const edit = yield mongoose_1.productModel.findByIdAndUpdate(product._id, product, { new: true });
        if (edit)
            return res.send(edit);
        return res.send(404);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.editProduct = editProduct;
const reserveStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { detail } = req.body;
        const editProducts = detail.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const editStock = yield mongoose_1.sizeModel.findByIdAndUpdate(product.size_id, {
                $inc: { stock: -product.quantity },
            }, { new: true });
            return editStock;
        }));
        const ready = yield Promise.all(editProducts);
        console.log(ready);
        if (!ready.includes(null))
            return next();
        return res.send(404);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.reserveStock = reserveStock;
