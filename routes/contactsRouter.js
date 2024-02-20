const express = require("express");
const { validateBody } = require("../helpers/index");
const { contactSchemas } = require("../schemas/index");
const { isValidId } = require("../middlewares/index");
const {
  getAllContacts,
  postContact,
  deleteContactById,
  updateContactById,
} = require("../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.post(
  "/",
  validateBody(contactSchemas.createContactSchema),
  postContact
);
contactsRouter.delete("/:contactId", isValidId, deleteContactById);
contactsRouter.patch(
  "/:contactId",
  isValidId,
  validateBody(contactSchemas.updateContactSchema),
  updateContactById
);

module.exports = contactsRouter;
