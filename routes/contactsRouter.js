const express = require("express");
const { validateBody } = require("../helpers/index");
const { contactSchemas } = require("../schemas/index");
const { isValidId, authenticate } = require("../middlewares/index");
const {
  getAllContacts,
  postContact,
  deleteContactById,
  updateContactById,
} = require("../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);
contactsRouter.post(
  "/",
  authenticate,
  validateBody(contactSchemas.createContactSchema),
  postContact
);
contactsRouter.delete(
  "/:contactId",
  authenticate,
  isValidId,
  deleteContactById
);
contactsRouter.patch(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(contactSchemas.updateContactSchema),
  updateContactById
);

module.exports = contactsRouter;
