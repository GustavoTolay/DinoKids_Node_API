import { Request, Response } from "express";
import { Inventory } from "../types";
import { handleError } from "../utils/handleErrors";
import { inventoryModel, productModel } from "../mongoose";

type modelReq = {
  model: Inventory;
  product_id?: string;
};

export const addModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { model, product_id }: modelReq = req.body;
    const addModel = await inventoryModel.create(model);
    const editProduct = await productModel.findByIdAndUpdate(
      product_id,
      {
        $push: { inventory: { _id: addModel._id } },
      },
      { new: true }
    );
    if (editProduct) return res.send(editProduct);
    return res.sendStatus(404);
  } catch (error) {
    return handleError(error, res);
  }
};

export const editModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { model }: modelReq = req.body;
    const { _id, ...query } = model;
    const editModel = await inventoryModel.findByIdAndUpdate(_id, query, {
      new: true,
    });
    if (editModel) return res.send(editModel);
    return res.sendStatus(404);
  } catch (error) {
    return handleError(error, res);
  }
};

export const deleteModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params
    const deleteModel = await inventoryModel.findByIdAndDelete(id);
    if (deleteModel) return res.send(deleteModel);
    return res.sendStatus(404);
  } catch (error) {
    return handleError(error, res);
  }
};
