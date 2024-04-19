import { MessageModel } from "../models/messages.model";
import { NotificationPayloadDTO } from "../types/NotificationPayload.type";
import axiosMetaAPI from "./api.services";

export const handelOutboundMessages = async (
  payload: NotificationPayloadDTO
) => {
  try {
    const { id, status } = payload.entry[0]?.changes[0]?.value?.statuses[0];
    if (id) {
      await MessageModel.findOneAndUpdate({ message_id: id }, { status });
    }
  } catch (e) {
    console.error(e);
  }
};

export const sendTextFormat = async (to: string, text: string) => {
  try {
    const { data } = await axiosMetaAPI.post("/messages", {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "text",
      text: {
        preview_url: false,
        body: text,
      },
    });
    if (data) {
      await MessageModel.create({
        message_id: data.messages[0].id,
        text,
        status: "init",
        type: "text",
        dir: "outbound",
        wa_id: data.contacts[0].wa_id,
      });
    }
    return data;
  } catch (error) {
    await MessageModel.create({
      text,
      status: "init",
      type: "text",
      dir: "outbound",
      wa_id: to,
    });
  }
};
