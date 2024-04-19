import mongoose, { Schema } from "mongoose";

type Contacts = mongoose.Document & {
  id: string;
  profile: {
    name: string;
    email: string;
    phone_id: string;
  };
  wa_id: string;
};

const ContactsSchema = new Schema(
  {
    payload: Object,
  },
  { timestamps: true }
);
export const ContactsModel = mongoose.model<Contacts>(
  "Contacts",
  ContactsSchema
);
