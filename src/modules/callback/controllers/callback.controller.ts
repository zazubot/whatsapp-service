import { Request, Response, NextFunction } from "express";
import { NotificationPayloadDTO } from "../../../types/NotificationPayload.type";
import { CallbackModel } from "../../../models/callback.model";
import { MessageModel } from "../../../models/messages.model";

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
    // console.log(JSON.stringify(payload, null, 4));
    console.log("Hit API ...");
    if (req.body.object) {
      // inbound Messages
      if (
        payload.entry &&
        payload.entry[0].changes &&
        payload.entry[0].changes[0] &&
        payload.entry[0].changes[0].value.messages &&
        payload.entry[0].changes[0].value.messages[0]
      ) {
        const message = payload.entry[0].changes[0].value.messages[0];
        console.log(
          "\x1b[33m",
          JSON.stringify(payload.entry[0].changes[0].value.messages[0], null, 4)
        );
        await MessageModel.create({
          _id: message.id,
          message,
          direction: "inbound",
        });
      }
    }
    // Outbound Messages
    if (
      payload.entry &&
      payload.entry[0].changes &&
      payload.entry[0].changes[0] &&
      payload.entry[0].changes[0].value.statuses &&
      payload.entry[0].changes[0].value.statuses[0]
    ) {
      // callback for
      const { id, status } = payload.entry[0].changes[0].value.statuses[0];
      console.log("\x1b[32m", JSON.stringify({ id, status }, null, 4));
    }
    await CallbackModel.create({ payload });
  } catch (error) {
    next(error);
  }
};
