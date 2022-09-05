/* libs */
import { Response, Request, NextFunction } from "express";

/* helpers */
import { ValidadeCNPJ } from "../helpers/util/patterns";
import {
  badServerMessage,
  internalErrorServerMessage,
} from "../helpers/responseMessage";

/* models */
import { empresa } from "../models/Empresa";

/* interface */
import { companyProps } from "../interface/Props";

export const validateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, cnpj, data_fundacao, valor_hora }: companyProps = req.body;

  if (!nome)
    return badServerMessage(res, {
      status: 400,
      code: "INVALID_NAME",
      message: "name is empty",
    });

  if (!cnpj)
    return badServerMessage(res, {
      status: 400,
      code: "INVALID_CNPJ",
      message: "cnpj is empty",
    });

  if (!data_fundacao)
    return badServerMessage(res, {
      status: 400,
      code: "INVALID_DATA_FUNDACAO",
      message: "data_fundacao is empty",
    });

  if (!valor_hora)
    return badServerMessage(res, {
      status: 400,
      code: "INVALID_VALOR_HORA",
      message: "valor_hora is empty",
    });

  if (nome.length > 50)
    return badServerMessage(res, {
      status: 400,
      code: "NOME_MAX_LENGTH",
      message: "nome is max length",
    });

  if (!ValidadeCNPJ(cnpj))
    return badServerMessage(res, {
      status: 400,
      code: "INVALID_CNPJ",
      message: "cnpj is invalid",
    });

  const findCnpj = await empresa.findOne({ where: { cnpj } });

  if (findCnpj)
    return badServerMessage(res, {
      status: 400,
      code: "EXISTS_CNPJ",
      message: "cnpj exists",
    });

  next();
};

export const insertCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await empresa.create(req.body);
  } catch (err) {
    internalErrorServerMessage(res, {
      status: 500,
      code: "INTERNAL_ERROR",
      message: "error database connection",
      error: err,
    });
    console.error(err);
  }

  next();
};
