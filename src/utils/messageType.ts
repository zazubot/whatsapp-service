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

export const isInboundMessage = (payload: NotificationPayloadDTO): boolean => {
  if (
    payload.entry &&
    payload.entry[0].changes &&
    payload.entry[0].changes[0] &&
    payload.entry[0].changes[0].value.messages &&
    payload.entry[0].changes[0].value.messages[0]
  ) {
    return true;
  }
  return false;
};

export const isOutboundMessage = (payload: NotificationPayloadDTO): boolean => {
  if (
    payload.entry &&
    payload.entry[0].changes &&
    payload.entry[0].changes[0] &&
    payload.entry[0].changes[0].value.statuses &&
    payload.entry[0].changes[0].value.statuses[0]
  ) {
    return true;
  }
  return false;
};
