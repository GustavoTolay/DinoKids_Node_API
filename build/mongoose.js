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
exports.DbConnect = exports.transactionModel = exports.categoryModel = exports.userModel = exports.productModel = exports.inventoryModel = exports.sizeModel = void 0;
const mongoose_1 = require("mongoose");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Size
const sizeSchema = new mongoose_1.Schema({
    // inventory_id: { type: Types.ObjectId, ref: "Inventories" },
    size: String,
    stock: Number,
    weight: Number,
});
exports.sizeModel = (0, mongoose_1.model)("Sizes", sizeSchema);
// Inventory
const inventorySchema = new mongoose_1.Schema({
    // product_id: { type: Types.ObjectId, ref: "Products" },
    model: String,
    sizes: [{ type: mongoose_1.Types.ObjectId, ref: "Sizes" }],
});
exports.inventoryModel = (0, mongoose_1.model)("Inventories", inventorySchema);
// Product
const productSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    brand: String,
    available: Boolean,
    category: String,
    inventory: [{ type: mongoose_1.Types.ObjectId, ref: "Inventories" }],
});
exports.productModel = (0, mongoose_1.model)("Products", productSchema);
// user
const userSchema = new mongoose_1.Schema({
    email: String,
    password: String,
    role: String,
});
exports.userModel = (0, mongoose_1.model)("Users", userSchema);
//categories
const categorySchema = new mongoose_1.Schema({
    name: String,
    available: Boolean,
});
exports.categoryModel = (0, mongoose_1.model)("Categories", categorySchema);
//transactions
const transactionSchema = new mongoose_1.Schema({
    detail: [
        {
            size_id: mongoose_1.Types.ObjectId,
            model_id: mongoose_1.Types.ObjectId,
            price: Number,
            quantity: Number,
            product_id: mongoose_1.Types.ObjectId
        },
    ],
    date: { type: Date, default: Date.now() },
    buyer_info: {
        fullname: String,
        ship_mode: String,
        state: String,
        locality: String,
        street: String,
        number: String,
        apartment: String,
        floor: String,
        postal_code: Number,
        email: String,
        phone: String,
        observations: String,
    },
    state: String,
    total: Number,
});
exports.transactionModel = (0, mongoose_1.model)("Transactions", transactionSchema);
//database connect
const { DATABASE_AUTH, DATABASE_USER, DATABASE_PASS, DATABASE_URI } = process.env;
const uri = DATABASE_URI;
const DbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ DATABASE_AUTH, DATABASE_USER, DATABASE_PASS, DATABASE_URI });
    yield (0, mongoose_1.connect)(uri, {
        user: DATABASE_USER,
        pass: DATABASE_PASS,
        authSource: DATABASE_AUTH,
        dbName: "mystore",
    });
    console.log("connected with database");
});
exports.DbConnect = DbConnect;
