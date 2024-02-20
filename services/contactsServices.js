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
// const remove = async (data) => await Contact.create(data);

module.exports = {
  getAll,
  create,
};
