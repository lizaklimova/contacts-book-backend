const { HttpError, controllerWrapper } = require("../helpers/index");
const {
  getAll,
  create,
  remove,
  update,
} = require("../services/contactsServices");

const getAllContacts = async (req, res) => {
  const result = await getAll(req.user._id);
  res.json(result);
};

const postContact = async (req, res) => {
  const result = await create(req.body, req.user._id);

  if (result.error) {
    throw HttpError(result.error.status, result.error.message);
  }

  res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await remove(contactId, req.user._id);

  if (!result) {
    throw HttpError(400, "Contact with such id doesn't exist");
  }

  res.json({
    message: "Contact was deleted successfully",
  });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await update(contactId, req.body, req.user._id);

  if (!result) {
    throw HttpError(400, "Contact with such id doesn't exist");
  }

  res.json(result);
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  postContact: controllerWrapper(postContact),
  deleteContactById: controllerWrapper(deleteContactById),
  updateContactById: controllerWrapper(updateContactById),
};
