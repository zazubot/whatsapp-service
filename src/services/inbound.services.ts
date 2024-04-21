import { MessageModel } from "../models/messages.model";
import { NotificationPayloadDTO } from "../types/NotificationPayload.type";

export const handelInboundMessages = async (
  payload: NotificationPayloadDTO
) => {
  try {
    const profile = payload.entry[0]?.changes[0]?.value?.contacts[0]?.profile;
    const message = payload.entry[0]?.changes[0]?.value?.messages[0];
    await MessageModel.create({
      ...message,
      dir: "inbound",
      status: "read",
      profile,
    });
  } catch (e) {
    console.error(e);
  }
};
