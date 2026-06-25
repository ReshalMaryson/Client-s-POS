const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB);

    console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = ConnectDB;
