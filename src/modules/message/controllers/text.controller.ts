import { Request, Response, NextFunction } from "express";
import {
  sendTextMessage,
  sendTextTemplate,
} from "../../../services/outbound.services";

export const TextMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { to, text } = req.body;
  try {
    if (to && text) {
      const data = await sendTextMessage(to, text);
      res.send(data);
    }
  } catch (error) {
    next(error);
  }
};

export const TemplateMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { to, template } = req.body;
  try {
    if (to && template) {
      const data = await sendTextTemplate(to, template);
      res.send(data);
    }
  } catch (error) {
    next(error);
  }
};
