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
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const path_1 = __importDefault(require("path"));
const client = new whatsapp_web_js_1.Client({ puppeteer: { args: ["--no-sandbox"] } });
const sendMessageAt = [8, 13, 21];
const messagesToSend = [
    {
        content: whatsapp_web_js_1.MessageMedia.fromFilePath(path_1.default.join(__dirname, "..", "public", "wapp-bot", "img-1.jpeg")),
    },
    {
        content: whatsapp_web_js_1.MessageMedia.fromFilePath(path_1.default.join(__dirname, "..", "public", "wapp-bot", "img-2.jpeg")),
    },
    {
        content: whatsapp_web_js_1.MessageMedia.fromFilePath(path_1.default.join(__dirname, "..", "public", "wapp-bot", "img-3.jpeg")),
        options: {
            caption: "Hola, tenemos estas prendas a la venta. Por preguntas pueden mandar MENSAJE, o también pueden visitar nuestra PÁGINA aquí:",
        },
    },
    {
        content: "https://dinokids.site",
    },
];
function sendEveryHour(chat) {
    setTimeout(sendEveryHour, 1000 * 60 * 60);
    const now = new Date();
    const hour = now.getHours();
    if (sendMessageAt.includes(hour)) {
        messagesToSend.forEach((msg) => chat.sendMessage(msg.content, msg.options));
    }
    return;
}
function connectWhatsapp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            client.on("qr", (qr) => {
                console.log("Received QR");
                qrcode_terminal_1.default.generate(qr, { small: true });
                console.log("hi");
            });
            client.on("ready", () => {
                console.log("Client is ready!");
                client.getChats().then((chats) => {
                    const myChat = chats.find((chat) => chat.name == "LOS MOLINOS COMPRA Y VENTA");
                    if (myChat)
                        sendEveryHour(myChat);
                    console.log("The chat wasn't found");
                });
            });
            client.initialize();
        }
        catch (error) {
            console.log(typeof error);
        }
    });
}
exports.default = connectWhatsapp;
