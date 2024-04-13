import { NotificationPayloadDTO } from "../types/NotificationPayload.type";

export const isTextMessage = (payload: NotificationPayloadDTO): boolean => {
  return payload.entry[0]?.changes[0]?.value?.messages[0]?.type === "text";
};
export const isImageMessage = (payload: NotificationPayloadDTO): boolean => {
  return payload.entry[0]?.changes[0]?.value?.messages[0]?.type === "image";
};
export const isStickerMessage = (payload: NotificationPayloadDTO): boolean => {
  return payload.entry[0]?.changes[0]?.value?.messages[0]?.type === "sticker";
};
export const isUnknownMessage = (payload: NotificationPayloadDTO): boolean => {
  return payload.entry[0]?.changes[0]?.value?.messages[0]?.type === "unknown";
};
export const isAudioMessage = (payload: NotificationPayloadDTO): boolean => {
  return payload.entry[0]?.changes[0]?.value?.messages[0]?.type === "audio";
};

export const logMessageStatus = (payload: NotificationPayloadDTO): void => {
  if (payload?.entry[0]?.changes[0]?.value?.messages[0]?.text?.body) {
    console.log(
      "\x1b[36m%s\x1b[0m",
      "new message==>",
      payload.entry[0]?.changes[0]?.value?.messages[0]?.text?.body
    );
  }
  if (payload?.entry[0]?.changes[0]?.value?.statuses[0]?.status) {
    console.log(
      "\x1b[33m%s\x1b[0m",
      "status ",
      payload.entry[0]?.changes[0]?.value?.statuses[0]?.status
    );
  }
};
