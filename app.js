const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const contactsRouter = require("./routes/contactsRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({
    message: "Route isn't found",
  });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

module.exports = app;
