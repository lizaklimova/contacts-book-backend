const HttpError = require("./HttpError.js");

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const bodyFieldsLength = Object.keys(req.body).length;

    if (!bodyFieldsLength) {
      if (req.method === "PATCH") {
        next(HttpError(400, "Body must include at least one field"));
      }

      next(HttpError(400, "Body can't be empty"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
