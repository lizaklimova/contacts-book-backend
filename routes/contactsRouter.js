const express = require("express");
const validateBody = require("../helpers/validateBody");
const { createContactSchema } = require("../schemas/contactsSchemas");
const {
  getAllContacts,
  postContact,
  deleteContactById,
  updateContactById,
} = require("../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.get("/", validateBody(createContactSchema), getAllContacts);
contactsRouter.post("/", validateBody(createContactSchema), postContact);
contactsRouter.delete(
  "/:contactId",
  validateBody(createContactSchema),
  deleteContactById
);
contactsRouter.patch(
  "/:contactId",
  validateBody(createContactSchema),
  updateContactById
);

module.exports = contactsRouter;
