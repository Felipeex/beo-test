import { Response, Request, NextFunction } from "express";

import {
  badServerMessage,
  successServerMessage,
} from "../helpers/responseMessage";

import { empresa } from "../models/Empresa";

interface reqProps {
  cnpj: string;
  data_inicio: string;
  data_fim: string;
}

export const validateCalculo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cnpj, data_inicio, data_fim }: reqProps = req.body;

  if (!cnpj)
    return badServerMessage(res, {
      status: 400,
      code: "INVALID_CNPJ",
      message: "cnpj is empty",
    });

  if (!data_inicio)
    return badServerMessage(res, {
      status: 400,
      code: "INVALID_DATA_INICIO",
      message: "data_inicio is empty",
    });

  if (!data_fim)
    return badServerMessage(res, {
      status: 400,
      code: "INVALID_DATA_FIM",
      message: "data_fim is empty",
    });

  const findCnpj = await empresa.findOne({ where: { cnpj } });

  if (!findCnpj)
    return badServerMessage(res, {
      status: 400,
      code: "INVALID_CNPJ",
      message: "cnpj no exist",
    });

  next();
};

export const calculateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cnpj, data_inicio, data_fim }: reqProps = req.body;

  var startDate = new Date(data_inicio);
  var finishDate = new Date(data_fim);

  var finalDate = getBusinessDatesCount(startDate, finishDate);

  const findCnpj = await empresa.findOne({ where: { cnpj } });

  if (findCnpj?.valor_hora) {
    const valor_calculado = (
      findCnpj.valor_hora *
      8 *
      finalDate
    ).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    }); /* calculate value */

    successServerMessage(res, { status: 200, valor_calculado });
  }

  next();
};

const getBusinessDatesCount = (startDate: Date, finishDate: Date) => {
  let count = 0;
  const curDate = new Date(startDate.getTime());
  while (curDate <= finishDate) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
};
