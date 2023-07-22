import express from "express";
import productsRouter from "./routes/products.routes";
import authRouter from "./routes/auth.routes";
import categoriesRouter from "./routes/categories.routes";
import paymentRouter from "./routes/payment.routes"
import { DbConnect } from "./mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import path from "path";
import swaggerDocs from "./docs/swagger";
import transactionsRouter from "./routes/transactions.routes";
import { modelRouter, sizeRouter } from "./routes/inventory.routes"

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.static("public/dist"));

app.get("/hello", (_req, res) => {
  console.log("someone pinged here!!!");
  res.send("hi");
});

app.get(
  [
    "/",
    "/category/:category",
    "/Login",
    "/signin",
    "/product/:id",
    "/edititem/:id",
    "/addcategory",
    "/additem",
    "/checkout"
  ],
  (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "dist", "index.html"));
  }
);

app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/categories", categoriesRouter);
app.use("/payment", paymentRouter);
app.use("/transactions", transactionsRouter);
app.use("/sizes", sizeRouter)
app.use("/models", modelRouter)

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  swaggerDocs(app, PORT)
});

DbConnect();
