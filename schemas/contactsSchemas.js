const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name field if required",
  }),
  number: Joi.string().required().messages({
    "any.required": "Number field if required",
  }),
});

module.exports = {
  createContactSchema,
};
