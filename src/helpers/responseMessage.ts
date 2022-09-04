import { Response } from "express";

export const successServerMessage = (res: Response, message: object) => {
  res.status(200).json(message);
};

export const badServerMessage = (res: Response, message: object) => {
  res.status(400).json(message);
};

export const internalErrorServerMessage = (res: Response, message: object) => {
  res.status(500).json(message);
};
