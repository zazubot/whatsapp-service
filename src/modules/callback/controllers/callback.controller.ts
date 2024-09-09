import { Request, Response, NextFunction } from "express";
import { NotificationPayloadDTO } from "../../../types/NotificationPayload.type";
import { CallbackModel } from "../../../models/callback.model";
import "dotenv/config";
import {
  isInboundMessage,
  isOutboundMessage,
} from "../../../utils/messageType";
import { handelInboundMessages } from "../../../services/inbound.services";
import {
  handelOutboundMessages,
  sendTextMessage,
} from "../../../services/outbound.services";
import WhatsApp from "whatsapp";
import {
  CLOUD_API_VERSION,
  CLOUD_API_ACCESS_TOKEN,
  WA_PHONE_NUMBER_ID,
  WA_BUSINESS_ID,
} from "../../../configs/config";
// import { generateResponseFromKnowledge } from "../../../services/openai.services";

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
    console.log("\x1b[33m", JSON.stringify(payload, null, 4));

    const wa = new WhatsApp(Number(WA_PHONE_NUMBER_ID));

    res.sendStatus(200);
    if (req.body.object) {
      await CallbackModel.create({ payload });
      // inbound Messages
      if (isInboundMessage(payload)) {
        // await handelInboundMessages(payload);
        if (payload.entry[0]?.changes[0]?.value?.messages[0].text.body) {
          // await sendTextMessage(
          //   payload.entry[0]?.changes[0]?.value?.messages[0]?.from,
          //   "thanks for message : " +
          //     payload.entry[0]?.changes[0]?.value?.messages[0].text.body
          // );
          await wa.messages.text(
            {
              body:
                "thanks for message : " +
                payload.entry[0]?.changes[0]?.value?.messages[0].text.body,
            },
            Number(payload.entry[0]?.changes[0]?.value?.messages[0]?.from)
          );
        }
      }
      // Outbound Messages
      // if (isOutboundMessage(payload)) {
      //   await handelOutboundMessages(payload);
      // }
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(200);
  }
};
