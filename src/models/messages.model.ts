import mongoose, { Schema } from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import {
  TypeOfMessage,
  Direction,
  TypeOfStatus,
} from "../types/NotificationPayload.type";

type Message = mongoose.Document & {
  wa_id: string;
  message_id: string;
  type: TypeOfMessage;
  status: TypeOfStatus;
  dir: Direction;
  text?: string;
  media?: string;
};

const MessageSchema = new Schema(
  {
    text: String,
    media: String,
    wa_id: { type: String, required: true },
    message_id: { type: String, unique: true },
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
