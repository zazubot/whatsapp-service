import { Request, Response, NextFunction } from "express";
import { NotificationPayloadDTO } from "../../../types/NotificationPayload.type";
import { CallbackModel } from "../../../models/callback.model";

/**
 * this method for verifyWebhook
 */
export const saveWebhookCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload: NotificationPayloadDTO = req.body;
    console.log(JSON.stringify(payload, null, 4));
    await CallbackModel.create({ payload });
    res.status(200);
  } catch (error) {
    next(error);
  }
};
