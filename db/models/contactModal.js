import { Schema, Types, model } from "mongoose";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false }
);

export const Contact = model("contact", contactsSchema);
