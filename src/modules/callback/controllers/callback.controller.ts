import { Request, Response, NextFunction } from "express";
import { NotificationPayloadDTO } from "../../../types/NotificationPayload.type";
import { CallbackModel } from "../../../models/callback.model";
import {
  isInboundMessage,
  isOutboundMessage,
} from "../../../utils/messageType";
import { handelInboundMessages } from "../../../services/inbound.services";
import {
  handelOutboundMessages,
  sendTextMessage,
} from "../../../services/outbound.services";

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
        if (payload.entry[0]?.changes[0]?.value?.messages[0].text.body) {
          await sendTextMessage(
            payload.entry[0]?.changes[0]?.value?.messages[0]?.from,
            "Thanks for your message 🌹" +
              payload.entry[0]?.changes[0]?.value?.messages[0].text.body
          );
        }
      }
      // Outbound Messages
      if (isOutboundMessage(payload)) {
        await handelOutboundMessages(payload);
      }
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(200);
  }
};
