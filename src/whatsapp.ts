import {
  Chat,
  Client,
  MessageContent,
  MessageMedia,
  MessageSendOptions,
} from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import path from "path";

type MessagePayload = {
  content: MessageContent;
  options?: MessageSendOptions;
};

const client = new Client({});
const sendMessageAt = [8, 13, 21];
const messagesToSend: MessagePayload[] = [
  {
    content: MessageMedia.fromFilePath(
      path.join(__dirname, "..", "public", "wapp-bot", "img-1.jpeg")
    ),
  },
  {
    content: MessageMedia.fromFilePath(
      path.join(__dirname, "..", "public", "wapp-bot", "img-2.jpeg")
    ),
  },
  {
    content: MessageMedia.fromFilePath(
      path.join(__dirname, "..", "public", "wapp-bot", "img-3.jpeg")
    ),
    options: {
      caption:
        "Hola, tenemos estas prendas a la venta. Por preguntas pueden mandar MENSAJE, o también pueden visitar nuestra PÁGINA aquí:",
    },
  },
  {
    content: "https://dinokids.site",
  },
];

function sendEveryHour(chat: Chat) {
  setTimeout(sendEveryHour, 1000 * 60 * 60);
  const now = new Date();
  const hour = now.getHours();
  if (sendMessageAt.includes(hour)) {
    messagesToSend.forEach((msg) => chat.sendMessage(msg.content, msg.options));
  }
  return;
}

async function connectWhatsapp() {
  try {
    client.on("qr", (qr) => {
      console.log("Received QR");
      qrcode.generate(qr, { small: true });
      console.log("hi");
    });

    client.on("ready", () => {
      console.log("Client is ready!");
      client.getChats().then((chats) => {
        const myChat = chats.find(
          (chat) => chat.name == "LOS MOLINOS COMPRA Y VENTA"
        );
        if (myChat) sendEveryHour(myChat);
        console.log("The chat wasn't found");
      });
    });

    client.initialize();
  } catch (error) {
    console.log(typeof error);
  }
}

export default connectWhatsapp;
