const Contact = require("../db/models/contactModel");

const getAll = async (userId) => await Contact.find({ owner: userId });
const create = async (data, userId) => {
  const doesNumberExist = await Contact.findOne({
    number: data.number,
    owner: userId,
  });

  if (doesNumberExist) {
    return {
      error: {
        message: "Number already exists",
        status: 409,
      },
    };
  }

  return await Contact.create({ ...data, owner: userId });
};

const remove = async (contactId, userId) =>
  await Contact.findOneAndDelete({ _id: contactId, owner: userId });

const update = async (contactId, data, userId) =>
  await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, data, {
    new: true,
  });

module.exports = {
  getAll,
  create,
  remove,
  update,
};
