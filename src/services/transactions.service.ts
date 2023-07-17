import { NextFunction, Request, Response } from "express";
import { productModel, transactionModel } from "../mongoose";
import { TransactionRequest } from "../types";
import { handleError } from "../utils/handleErrors";

export const createTransaction = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const { detail, buyer_info }: TransactionRequest = req.body;
    const priceList = detail.map( async (product, index) => {
      const document = await productModel.findById(product.product_id, "price");
      const total = document?.price as number * product.quantity;
      detail[index].price = total;
      return total;
    })
    const readyPriceList = await Promise.all(priceList);
    const total = readyPriceList.reduce((a, b) => a + b, 0);
    console.log(detail)
    const addTransaction = await transactionModel.create({
      detail,
      buyer_info,
      total,
      state: "pending",
    });
    return res.send(addTransaction);
  } catch (error) {
    return handleError(error, res)
  }
};
