import mongoose, { Schema } from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import { MessageObject } from "../types/NotificationPayload.type";

export type Message = mongoose.Document & MessageObject;

const MessageSchema = new Schema(
  {
    from: { type: String, required: true },
    id: { type: String, unique: true },
    dir: {
      type: String,
      required: true,
      enum: ["outbound", "inbound"],
    },
    type: {
      type: String,
      required: true,
      enum: [
        "text",
        "image",
        "document",
        "video",
        "sticker",
        "audio",
        "interactive",
        "order",
      ],
    },
    profile: Object,
    text: Object,
    template: Object,
    audio: Object,
    image: Object,
    video: Object,
    sticker: Object,
    button: Object,
    context: Object,
    document: Object,
    interactive: Object,
    status: {
      type: String,
      required: true,
      enum: ["init", "delivered", "sent", "read"],
    },
  },
  { timestamps: true }
);

MessageSchema.plugin(mongoosePagination);
export const MessageModel: Pagination<Message> = mongoose.model<
  Message,
  Pagination<Message>
>("Message", MessageSchema);
