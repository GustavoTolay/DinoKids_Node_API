import express from "express";
import {
  addModel,
  addSize,
  deleteModelById,
  deleteSizeById,
  editModel,
  editSize,
} from "../services/inventory.service";
import { verifyUser } from "../services/auth.service";

export const modelRouter = express.Router();
export const sizeRouter = express.Router();

modelRouter.post("/", verifyUser, addModel);

modelRouter.put("/", verifyUser, editModel);

modelRouter.delete("/", verifyUser, deleteModelById);

sizeRouter.post("/", verifyUser, addSize);

sizeRouter.put("/", verifyUser, editSize);

sizeRouter.delete("/", verifyUser, deleteSizeById);
