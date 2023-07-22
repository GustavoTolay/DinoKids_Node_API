import { Request, Response } from "express";
import { categoryModel } from "../mongoose";
import { Category } from "../types";
import { handleError } from "../utils/handleErrors";

export const getAllCategories = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const list = await categoryModel.find({});
    return res.send(list);
  } catch (error) {
    return res.send(error);
  }
};

export const addCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const category: Category = req.body;
    const newCategory = new categoryModel(category);
    await newCategory.save();
    return res.send("category added");
  } catch (error) {
    return handleError(error, res);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const category: Category = req.body;
    const { _id, ...updateValues } = category;
    const editedCategory = await categoryModel.findByIdAndUpdate(
      _id,
      updateValues,
      { new: true }
    );
    if (editedCategory) return res.send(editedCategory);
    return res.sendStatus(404);
  } catch (error) {
    return handleError(error, res);
  }
};

export const deleteCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    if (deletedCategory) return res.send(deletedCategory);
    return res.sendStatus(404);
  } catch (error) {
    return handleError(error, res);
  }
};
