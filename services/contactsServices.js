const Contact = require("../db/models/contactModel");

const getAll = async () => await Contact.find({});
const create = async (data) => {
  const doesNumberExist = await Contact.findOne({ number: data.number });

  if (doesNumberExist) {
    return {
      error: {
        message: "Number already exists",
        status: 409,
      },
    };
  }

  return await Contact.create(data);
};

const remove = async (contactId) => await Contact.findByIdAndDelete(contactId);

const update = async (contactId, data) =>
  await Contact.findByIdAndUpdate(contactId, data, { new: true });

module.exports = {
  getAll,
  create,
  remove,
  update,
};
