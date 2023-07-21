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
exports.sendFeedback = exports.createPreference = void 0;
const mercadopago_1 = __importDefault(require("mercadopago"));
const luxon_1 = require("luxon");
const handleErrors_1 = require("../utils/handleErrors");
const createPreference = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(luxon_1.DateTime.now().toISO());
        const { items, shipments } = req.body;
        let preference = {
            items,
            back_urls: {
                success: "https://dinokids.site/payment/feedback",
                failure: "https://dinokids.site/payment/feedback",
                pending: "https://dinokids.site/payment/feedback",
            },
            auto_return: "approved",
            payment_methods: {
                excluded_payment_types: [{ id: "ticket" }],
            },
            shipments,
            expires: true,
            expiration_date_from: luxon_1.DateTime.now().toISO(),
            expiration_date_to: luxon_1.DateTime.now().plus({ minutes: 15 }).toISO()
        };
        const response = yield mercadopago_1.default.preferences.create(preference);
        return res.json({
            id: response.body.id,
        });
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.createPreference = createPreference;
const sendFeedback = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json({
            Payment: req.query.payment_id,
            Status: req.query.status,
            MerchantOrder: req.query.merchant_order_id,
        });
    }
    catch (error) {
        return (0, handleErrors_1.handleError)(error, res);
    }
});
exports.sendFeedback = sendFeedback;
