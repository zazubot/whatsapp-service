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
