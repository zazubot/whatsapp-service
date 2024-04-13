import mongoose, { Schema } from "mongoose";

type Setting = mongoose.Document & {
  key: string;
  value: object;
};

const SettingSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    value: Object,
  },
  { timestamps: true }
);
export const SettingModel = mongoose.model<Setting>("Setting", SettingSchema);
