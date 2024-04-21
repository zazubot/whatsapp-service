import { MessageModel } from "../models/messages.model";
import { NotificationPayloadDTO } from "../types/NotificationPayload.type";

export const handelInboundMessages = async (
  payload: NotificationPayloadDTO
) => {
  try {
    const message = payload.entry[0]?.changes[0]?.value?.messages[0];
    await MessageModel.create({ ...message, dir: "inbound", status: "read" });
  } catch (e) {
    console.error(e);
  }
};
