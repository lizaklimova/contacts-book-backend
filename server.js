const connectMongo = require("./db/mongoConnect");
const app = require("./app");

const { PORT = 8000 } = process.env;

const startSever = async () => {
  try {
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Server is successfully running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startSever();
