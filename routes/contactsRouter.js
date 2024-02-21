const express = require("express");
const { validateBody } = require("../helpers/index");
const { contactSchemas } = require("../schemas/index");
const { isValidId, authorize } = require("../middlewares/index");
const {
  getAllContacts,
  postContact,
  deleteContactById,
  updateContactById,
} = require("../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.get("/", authorize, getAllContacts);
contactsRouter.post(
  "/",
  authorize,
  validateBody(contactSchemas.createContactSchema),
  postContact
);
contactsRouter.delete("/:contactId", authorize, isValidId, deleteContactById);
contactsRouter.patch(
  "/:contactId",
  authorize,
  isValidId,
  validateBody(contactSchemas.updateContactSchema),
  updateContactById
);

module.exports = contactsRouter;
