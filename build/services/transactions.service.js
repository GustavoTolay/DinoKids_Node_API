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
exports.createTransaction = void 0;
const mongoose_1 = require("../mongoose");
const handleErrors_1 = require("../utils/handleErrors");
const createTransaction = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { detail, buyer_info } = req.body;
        const priceList = detail.map((product, index) => __awaiter(void 0, void 0, void 0, function* () {
            const document = yield mongoose_1.productModel.findById(product.product_id, "price");
            const total = (document === null || document === void 0 ? void 0 : document.price) * product.quantity;
            detail[index].price = total;
            return total;
        }));
        const readyPriceList = yield Promise.all(priceList);
        const total = readyPriceList.reduce((a, b) => a + b, 0);
        console.log(detail);
        const addTransaction = yield mongoose_1.transactionModel.create({
            detail,
            buyer_info,
            total,
            state: "pending",
        });
        return res.send(addTransaction);
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.createTransaction = createTransaction;
