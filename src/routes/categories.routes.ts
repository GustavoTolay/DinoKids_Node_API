import express from "express";
import { getAllCategories, addCategory, deleteCategoryById, updateCategory } from "../services/categories.service";
import { verifyUser } from "../services/auth.service";

const router = express.Router();

export default router;

router.get("/", getAllCategories);

router.post("/", verifyUser, addCategory);

router.delete("/:id", verifyUser, deleteCategoryById);

router.put("/", verifyUser, updateCategory)
