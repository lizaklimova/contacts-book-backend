const { Schema, Types, model } = require("mongoose");

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

const Contact = model("contact", contactsSchema);

module.exports = Contact;
