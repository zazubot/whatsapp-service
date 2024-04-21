import mongoose, { Schema } from "mongoose";

type Contacts = mongoose.Document & {
  name: string;
  phone: string;
  email: string;
  address: string;
  company: string;
  target: string;
  gender: string;
  language: string;
  interests: string[];
};

const ContactsSchema = new Schema(
  {
    name: String,
    phone: String,
    email: String,
    address: String,
    company: String,
    target: String,
    interests: Array,
  },
  { timestamps: true }
);
export const ContactsModel = mongoose.model<Contacts>(
  "Contacts",
  ContactsSchema
);
