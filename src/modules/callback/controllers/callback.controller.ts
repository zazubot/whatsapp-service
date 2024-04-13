import { Request, Response, NextFunction } from "express";
import { NotificationPayloadDTO } from "../../../types/NotificationPayload.type";
import { CallbackModel } from "../../../models/callback.model";
import axiosMetaAPI from "../../../services/api.services";
import { isTextMessage } from "../../../utils/messageType";

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
    // save payload
    await CallbackModel.create({ payload });
    if (isTextMessage(payload)) {
      await axiosMetaAPI.post("/messages", {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: payload.entry[0]?.changes[0]?.value?.messages[0]?.from,
        type: "text",
        text: {
          preview_url: false,
          body: payload.entry[0].changes[0].value.messages[0].text.body,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
