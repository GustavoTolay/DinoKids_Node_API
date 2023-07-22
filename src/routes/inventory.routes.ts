import express from "express";
import { addModel, addSize, deleteModelById, deleteSizeById, editModel, editSize } from "../services/inventory.service";
import { verifyUser } from "../services/auth.service";

const router = express.Router()

export default router

router.post("/models", verifyUser, addModel)

router.put("/models", verifyUser, editModel)

router.delete("/models", verifyUser, deleteModelById)

router.post("/sizes", verifyUser, addSize)

router.put("/sizes", verifyUser, editSize)

router.delete("/sizes", verifyUser, deleteSizeById)