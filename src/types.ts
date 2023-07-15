import {
  PreferenceItem,
  PreferenceShipment,
} from "mercadopago/models/preferences/create-payload.model";
import { Mixed } from "mongoose";

// Product
export interface Product {
  _id?: string;
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  available: boolean;
  category: string;
  inventory: Inventory[];
}

export type Inventory = {
  _id?: string;
  product_id: Mixed;
  model: string;
  sizes: Size[];
  
};

export type Size = {
  _id?: string;
  inventory_id: Mixed;
  size: string;
  stock: number;
  weight: number;
};

// User
export interface User {
  _id?: string
  email: string;
  password: string;
  role: string;
}

// Categories
export type Category = {
  _id?: string
  name: string;
  available: boolean;
};

// Transactions
export type Detail = {
  _id?: string
  model_id: string;
  size_id: string;
  quantity: number;
  price: number;
};

type WithdrawInfo = {
  ship_mode: "withdraw";
};

type ShippingInfo = {
  ship_mode: "shipping";
  state: string;
  locality: string;
  street: string;
  number: string;
  apartment?: string;
  floor?: string;
  postal_code: number;
};

export type BuyerInfo = {
  _id?: string
  fullname: string;
  email?: string;
  phone?: string;
  observations?: string;
} & (ShippingInfo | WithdrawInfo);

export type Transaction = {
  _id?: string
  detail: Detail[];
  buyer_info: BuyerInfo;
  total: number;
  date?: Date;
  state: "pending" | "successfull" | "refused";
};

// Preferences
export type PreferenceRequest = {
  items: PreferenceItem[];
  shipments?: PreferenceShipment;
};

// Request
export type TransactionRequest = {
  detail: Detail[];
  buyer_info: BuyerInfo;
};
