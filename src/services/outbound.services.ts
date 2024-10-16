import { MessageModel } from "../models/messages.model";
import { NotificationPayloadDTO } from "../types/NotificationPayload.type";
import { axiosMetaAPI } from "./api.services";

export const handelOutboundMessages = async (
  payload: NotificationPayloadDTO
) => {
  try {
    const { id, status } = payload.entry[0]?.changes[0]?.value?.statuses[0];
    if (id) {
      await MessageModel.findOneAndUpdate({ id }, { status });
    }
  } catch (e) {
    console.error(e);
  }
};

export const sendTextMessage = async (to: string, text: string) => {
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
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendTextTemplate = async (to: string, template: object) => {
  try {
    const { data } = await axiosMetaAPI.post("/messages", {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template,
    });
    if (data) {
      await MessageModel.create({
        id: data.messages[0].id,
        from: data.contacts[0].wa_id,
        template,
        status: "init",
        type: "template",
        dir: "outbound",
      });
    }
    return data;
  } catch (error) {
    await MessageModel.create({
      template,
      status: "init",
      type: "template",
      dir: "outbound",
      id: to,
    });
  }
};
