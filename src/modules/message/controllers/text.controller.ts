import { Request, Response, NextFunction } from "express";
import { sendTextFormat } from "../../../services/outbound.services";

export const sendTextMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { to, text } = req.body;
  try {
    if (to && text) {
      const data = await sendTextFormat(to, text);
      res.send(data);
    }
  } catch (error) {
    next(error);
  }
};
