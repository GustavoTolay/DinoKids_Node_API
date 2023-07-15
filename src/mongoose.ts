import { Schema, model, connect, Types } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import { User, Category, Transaction, Size, Product, Inventory } from "./types";

// Size
const sizeSchema = new Schema<Size>({
  inventory_id: { type: Types.ObjectId, ref: "Inventories" },
  size: String,
  stock: Number,
  weight: Number,
});

export const sizeModel = model<Product>("Sizes", sizeSchema);

// Inventory
const inventorySchema = new Schema<Inventory>({
  product_id: { type: Types.ObjectId, ref: "Products" },
  model: String,
  sizes: [{ type: Types.ObjectId, ref: "Sizes" }],
});

export const inventoryModel = model<Inventory>("Inventories", inventorySchema);

// Product
const productSchema = new Schema<Product>({
  name: String,
  description: String,
  image: String,
  price: Number,
  brand: String,
  available: Boolean,
  category: String,
  inventory: [
    {
      model: String,
      sizes: [{ type: Types.ObjectId, ref: "Inventories" }],
    },
  ],
});

export const productModel = model<Product>("Products", productSchema);

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
      model_id: Types.ObjectId,
      price: Number,
      quantity: Number,
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

const { DATABASE_AUTH, DATABASE_USER, DATABASE_PASS, DATABASE_URI } =
  process.env;

const uri = DATABASE_URI as string;

export const DbConnect = async () => {
  console.log({ DATABASE_AUTH, DATABASE_USER, DATABASE_PASS, DATABASE_URI })
  await connect(uri, {
    user: DATABASE_USER,
    pass: DATABASE_PASS,
    authSource: DATABASE_AUTH,
    dbName: "mystore",
  });
  console.log("connected with database");
};
