import { Request, Response } from "express";
import { Inventory, Size } from "../types";
import { handleError } from "../utils/handleErrors";
import { inventoryModel, productModel, sizeModel } from "../mongoose";

type modelReq = {
  model: Inventory;
  product_id?: string;
};

type sizeReq = {
  size: Size;
  model_id?: string;
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
    if (editProduct) return res.send(addModel);
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
    const model: Inventory = req.body;
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

export const deleteModelById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const deleteModel = await inventoryModel.findByIdAndDelete(id);
    if (!deleteModel) return res.sendStatus(404);
    const sizeList = deleteModel.sizes.map(async (size) => {
      const deleteSize = await sizeModel.findByIdAndDelete(size._id);
      return deleteSize
    });
    const resolvedSizes = await Promise.all(sizeList);
    return res.send({ deleteModel, resolvedSizes });
  } catch (error) {
    return handleError(error, res);
  }
};

export const addSize = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { size, model_id }: sizeReq = req.body;
    const addSize = await sizeModel.create(size);
    const editModel = await inventoryModel.findByIdAndUpdate(
      model_id,
      { $push: { sizes: { _id: addSize._id } } },
      { new: true }
    );
    if (editModel) return res.send(addSize);
    return res.sendStatus(404);
  } catch (error) {
    return handleError(error, res);
  }
};

export const editSize = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const size: Size = req.body;
    const { _id, ...query } = size;
    const editSize = await sizeModel.findByIdAndUpdate(size._id, query, {
      new: true,
    });
    if (editSize) return res.send(editSize);
    return res.sendStatus(404);
  } catch (error) {
    return handleError(error, res);
  }
};

export const deleteSizeById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const deleteSize = await sizeModel.findByIdAndDelete(id)
    if (deleteSize) return res.send(deleteSize);
    return res.sendStatus(404);
  } catch (error) {
    return handleError(error, res);
  }
};
