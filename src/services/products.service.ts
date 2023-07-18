import { NextFunction, Request, Response } from "express";
import { inventoryModel, productModel, sizeModel } from "../mongoose";
import {
  Inventory,
  PreferenceRequest,
  Product,
  Size,
  TransactionRequest
} from "../types";
import { handleError } from "../utils/handleErrors";

export const getManyById = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const idList: { _id: string }[] = req.body;
    const productsList = await productModel.find({ $or: idList });
    if (productsList.length) return res.send(productsList);
    return res.sendStatus(404);
  } catch (error) {
    return handleError(error, res);
  }
};

export const verifyStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { items }: PreferenceRequest = req.body;
    console.log(req.body);
    let sufficientStock: boolean[] = [];
    const sizeList = items.map(async (product) => {
      const size = (await sizeModel.findById(product.id)) as Size;
      sufficientStock.push(size.stock >= (product.quantity || 0));
      return size;
    });
    const readyList = await Promise.all(sizeList);
    console.log({ sufficientStock });
    if (sufficientStock.includes(false)) return res.status(403).send(readyList);
    return next();
  } catch (error) {
    return handleError(error, res);
  }
};

export const addProduct = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const product: Product = JSON.parse(req.body.product);
    product.image = req.file?.filename as string
    const modelList = product.inventory.map(async (model) => {
      const sizeList = await sizeModel.insertMany(model.sizes);
      model.sizes = sizeList.map((size) => {
        return { _id: size._id as string } as Size;
      });
      return model;
    });
    const inventoryList = await inventoryModel.insertMany(
      await Promise.all(modelList)
    );
    product.inventory = inventoryList.map((model) => {
      return { _id: model._id } as Inventory;
    });
    const addProduct = await productModel.create(product);
    return res.send(addProduct);
  } catch (error) {
    return handleError(error, res);
  }
};

export const getAllAvailableProducts = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const findAllProducts: Product[] = await productModel.find({
      available: true,
    });
    return res.send(findAllProducts);
  } catch (error) {
    return handleError(error, res);
  }
};

export const getAllProducts = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const findAllProducts: Product[] = await productModel
      .find({})
      .populate({ path: "inventory", populate: { path: "sizes" } });
    return res.send(findAllProducts);
  } catch (error) {
    return handleError(error, res);
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const id: string = req.params.id;
    console.log("hi");
    const find: Product | null = await productModel.findByIdAndDelete(id);
    if (find) return res.send(find);
    return res.sendStatus(404);
  } catch (error) {
    return handleError(error, res);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const id: string = req.params.id;
    const find = await productModel
      .findById(id)
      .populate({ path: "inventory", populate: { path: "sizes" } });
    if (find) return res.send(find);
    return res.sendStatus(404);
  } catch (error) {
    return handleError(error, res);
  }
};

export const getProductsByCategory = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const category: string = req.params.category;
    const find: Product[] | null = await productModel.find({
      category: category,
    });
    if (find) return res.send(find);
    return res.sendStatus(404);
  } catch (error) {
    return handleError(error, res);
  }
};

export const modifyProduct = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  try {
    const product: Product = req.body;
    const edit = await productModel.findByIdAndUpdate(product._id, product);
    if (edit) return res.send(edit);
    return res.send(404);
  } catch (error) {
    return handleError(error, res);
  }
};

export const reserveStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const { detail }: TransactionRequest = req.body;
    const editProducts = detail.map(async (product) => {
      const editStock = await sizeModel.findByIdAndUpdate(
        product.size_id,
        {
          $inc: { stock: -product.quantity },
        },
        { new: true }
      );
      return editStock;
    });
    const ready = await Promise.all(editProducts);
    console.log(ready);
    if (!ready.includes(null)) return next();
    return res.send(404);
  } catch (error) {
    return handleError(error, res);
  }
};
