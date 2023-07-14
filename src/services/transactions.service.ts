import { NextFunction, Request, Response } from "express";
import { transactionModel } from "../mongoose";
import { BuyerInfo, Detail } from "../types";

type RequestBody = {
  detail: Detail[];
  buyer_info: BuyerInfo;
};

export const createTransaction = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const { detail, buyer_info }: RequestBody = req.body;
    const total = detail.reduce((a, b) => a + b.price * b.quantity, 0);
    const addTransaction = new transactionModel({
      detail,
      buyer_info,
      total,
      state: "pending",
    });
    await addTransaction.save();
    return res.send(addTransaction);
  } catch (error) {
    return res.status(500).send(error);
  }
};
