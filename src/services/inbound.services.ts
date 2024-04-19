import { MessageModel } from "../models/messages.model";
import { NotificationPayloadDTO } from "../types/NotificationPayload.type";

export const handelInboundMessages = async (
  payload: NotificationPayloadDTO
) => {
  try {
    const message = payload.entry[0]?.changes[0]?.value?.messages[0];
    if (message.type === "text") {
      await MessageModel.create({
        message_id: message.id,
        text: message.text.body,
        type: message.type,
        status: "read",
        dir: "inbound",
        wa_id: message.from,
      });
    } else {
      // fetch media
    }
  } catch (e) {
    console.error(e);
  }
};
