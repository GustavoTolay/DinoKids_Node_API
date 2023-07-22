import express from "express";
import { addModel, addSize, deleteModel, editModel, editSize } from "../services/inventory.service";
import { verifyUser } from "../services/auth.service";

const router = express.Router()

export default router

router.post("/model", verifyUser, addModel)

router.put("/model", verifyUser, editModel)

router.delete("/model", verifyUser, deleteModel)

router.post("/size", verifyUser, addSize)

router.put("/size", verifyUser, editSize)