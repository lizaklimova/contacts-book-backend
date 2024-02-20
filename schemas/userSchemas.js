const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name field is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid address",
    "any.required": "Email field is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be longer than 8 symbols",
    "any.required": "Password field is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email field is required",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password field is required",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
