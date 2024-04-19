import { Request, Response, NextFunction } from "express";
import { NotificationPayloadDTO } from "../../../types/NotificationPayload.type";
import { CallbackModel } from "../../../models/callback.model";
import { MessageModel } from "../../../models/messages.model";
import {
  isInboundMessage,
  isOutboundMessage,
} from "../../../utils/messageType";
import { handelInboundMessages } from "../../../services/inbound.services";
import { handelOutboundMessages } from "../../../services/outbound.services";

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
    res.sendStatus(200);
    console.log("\x1b[33m", JSON.stringify(payload, null, 4));
    if (req.body.object) {
      await CallbackModel.create({ payload });
      // inbound Messages
      if (isInboundMessage(payload)) {
        await handelInboundMessages(payload);
      }
      // Outbound Messages
      if (isOutboundMessage(payload)) {
        // callback for
        await handelOutboundMessages(payload);
        // console.log("\x1b[32m", JSON.stringify({  }, null, 4));
      }
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(200);
  }
};
