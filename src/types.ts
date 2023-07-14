import {
  PreferenceItem,
  PreferenceShipment,
} from "mercadopago/models/preferences/create-payload.model";

// Product
export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  available: boolean;
  category: string;
  inventary: Inventary[];
}

export type newProduct = Omit<Product, "_id">;

type Inventary = {
  model: string;
  sizes: Size[];
};

export type Size = {
  size: string;
  stock: number;
  weight: number;
};

// User
export interface User {
  email: string;
  password: string;
  role: string;
}

// Categories
export type Category = {
  name: string;
  available: boolean;
};

// Transactions
type Detail = {
  size_id: string;
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
  fullname: string;
  email?: string;
  phone?: string;
  observations?: string;
} & (ShippingInfo | WithdrawInfo);

export type Transaction = {
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
