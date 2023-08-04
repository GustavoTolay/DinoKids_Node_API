import express from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  modifyProduct,
  getManyById
} from "../services/products.service";
import { verifyUser } from "../services/auth.service";
import { upload } from "../middlewares/multer";
import { resizeImage } from "../middlewares/sharp";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/stock", getManyById)

router.get("/:id", getProductById);

router.get("/category/:category", getProductsByCategory);

router.post("/", upload.single("image"), resizeImage, verifyUser, addProduct);

router.delete("/:id", verifyUser, deleteProductById);

router.put("/", verifyUser, modifyProduct);

// router.post("/test", addProduct)

export default router;
