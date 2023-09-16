"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_service_1 = require("../services/products.service");
const transactions_service_1 = require("../services/transactions.service");
const router = (0, express_1.Router)();
router.post("/", products_service_1.reserveStock, transactions_service_1.createTransaction);
exports.default = router;
