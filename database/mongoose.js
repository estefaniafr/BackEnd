// const mongoose = require('mongoose');

const { DB_DEV } = process.env;

const connection = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  try {
    const db = await mongoose.connect(DB_DEV, options);
    console.log(db, "Database is now connected");
  } catch (error) {
    console.error(error);
    throw new Error("Error connecting with database");
  }
};

module.exports = {
  connection,
};
