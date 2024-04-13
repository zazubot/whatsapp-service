import { Request, Response, NextFunction } from "express";
import { META_VERIFY_TOKEN } from "../../../configs/config";

/**
 * this method for verifyWebhook
 */
export const verifyWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      req.query["hub.mode"] == "subscribe" &&
      req.query["hub.verify_token"] == META_VERIFY_TOKEN
    ) {
      res.send(req.query["hub.challenge"]);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};
