const HttpError = require("../helpers/HttpError");
const { getAll, create } = require("../services/contactsServices");

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
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  postContact,
  deleteContactById,
  updateContactById,
};
