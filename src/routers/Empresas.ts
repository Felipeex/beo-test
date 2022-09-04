import express, { Request, Response } from "express";
const router = express.Router();

import { insertCompany, validateCompany } from "../controllers/Empresas";

router.post(
  "/",
  validateCompany,
  insertCompany,
  (req: Request, res: Response) => {
    res.json(req.body);
  }
);

export default router;
