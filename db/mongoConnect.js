const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

const connectMongo = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database is running");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectMongo;
