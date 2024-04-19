import mongoose, { Schema } from "mongoose";
import { MessageObject } from "../types/NotificationPayload.type";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

type Message = mongoose.Document & {
  message: MessageObject;
};

const MessageSchema = new Schema(
  {
    _id: { String, unique: true },
    direction: {
      type: String,
      required: true,
      enum: ["outbound", "inbound"],
    },
    message: Object,
  },
  { timestamps: true }
);

MessageSchema.plugin(mongoosePagination);
export const MessageModel: Pagination<Message> = mongoose.model<
  Message,
  Pagination<Message>
>("User", MessageSchema);
