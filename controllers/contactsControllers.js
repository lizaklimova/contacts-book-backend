const { HttpError, controllerWrapper } = require("../helpers/index");
const {
  getAll,
  create,
  remove,
  update,
} = require("../services/contactsServices");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  try {
    const result = await create(req.body);

    if (result.error) {
      throw HttpError(result.error.status, result.error.message);
    }

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await remove(contactId);

    if (!result) {
      throw HttpError(400, "Contact with such id doesn't exist");
    }

    res.json({
      message: "Contact was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await update(contactId, req.body);

    if (!result) {
      throw HttpError(400, "Contact with such id doesn't exist");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  postContact: controllerWrapper(postContact),
  deleteContactById: controllerWrapper(deleteContactById),
  updateContactById: controllerWrapper(updateContactById),
};
