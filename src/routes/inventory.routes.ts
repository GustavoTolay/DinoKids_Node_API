import express from "express";
import { addModel } from "../services/inventory.service";
import { verifyUser } from "../services/auth.service";

const router = express.Router()

export default router

router.post("/", verifyUser, addModel)