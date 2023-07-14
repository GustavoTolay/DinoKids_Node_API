import { Schema, model, connect, Types } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import { User, Category, Transaction, newProduct } from "./types";

const productSchema = new Schema<newProduct>({
  name: String,
  description: String,
  image: String,
  price: Number,
  brand: String,
  available: Boolean,
  category: String,
  inventary: [
    {
      model: String,
      sizes: [
        {
          size: String,
          stock: Number,
          weight: Number,
        },
      ],
    },
  ],
});

export const productModel = model<newProduct>("Products", productSchema);

// user
const userSchema = new Schema<User>({
  email: String,
  password: String,
  role: String,
});

export const userModel = model<User>("Users", userSchema);

//categories
const categorySchema = new Schema<Category>({
  name: String,
  available: Boolean,
});

export const categoryModel = model<Category>("Categories", categorySchema);

//transactions
const transactionSchema = new Schema<Transaction>({
  detail: [
    {
      size_id: Types.ObjectId,
      price: Number,
      quantity: Number
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

export const transactionModel = model<Transaction>(
  "Transactions",
  transactionSchema
);

//database connect

const uri = process.env.DATABASE_URI as string;

export const DbConnect = async () => {
  console.log(process.env.DATABASE_AUTH);
  console.log(process.env.DATABASE_USER);
  console.log(process.env.DATABASE_PASS);
  console.log(process.env.DATABASE_URI);
  await connect(uri, {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    authSource: process.env.DATABASE_AUTH,
    dbName: "mystore",
  });
  console.log("connected with database");
};
