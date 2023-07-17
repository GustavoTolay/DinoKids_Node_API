import { Router } from "express";
import { reserveStock } from "../services/products.service";
import { createTransaction } from "../services/transactions.service";

const router = Router();

router.post("/", reserveStock, createTransaction);

export default router;
