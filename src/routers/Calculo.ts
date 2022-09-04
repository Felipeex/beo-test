import express from "express";
import { calculateService, validateCalculo } from "../controllers/Calculo";
const router = express.Router();

router.post("/", validateCalculo, calculateService);

export default router;
