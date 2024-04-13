import mongoose, { Schema } from "mongoose";

type Callback = mongoose.Document & {
  payload: object;
};

const CallbackSchema = new Schema(
  {
    payload: Object,
  },
  { timestamps: true }
);
export const CallbackModel = mongoose.model<Callback>(
  "Callback",
  CallbackSchema
);
