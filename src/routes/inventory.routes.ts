import express from "express";
import { addModel, editModel } from "../services/inventory.service";
import { verifyUser } from "../services/auth.service";

const router = express.Router()

export default router

router.post("/model", verifyUser, addModel)

router.put("/model", verifyUser, editModel)