import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import { handleError } from "../utils/handleErrors";

export const resizeImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imagePath = req.file?.path;
    const imageName = req.file?.filename;
    await sharp(imagePath).resize(350).toFile(`./public/resized/${imageName}`);
    return next();
  } catch (error) {
    return handleError(error, res);
  }
};