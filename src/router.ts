import express from "express";
import { database } from "./database";
import "./models/Empresa";
import "./database";

const app = express();
app.use(express.json());

import empresas from "./routers/Empresas";
app.use("/empresas", empresas);

import calculo from "./routers/Calculo";
app.use("/calculo", calculo);

app.listen(process.env.PORT || 4000, () => {
  console.log("Api rodando com sucesso! 🚀");
  database.sync();
});
