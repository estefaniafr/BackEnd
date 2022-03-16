const mongoose = require("mongoose");

const { DB_DEV } = process.env;

const connection = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(DB_DEV, options);
    console.log("Database is now connected");
  } catch (error) {
    console.error(error);
    throw new Error("Error connecting with database");
  }
};

module.exports = {
  connection,
};
