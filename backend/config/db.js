const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (err) {
    console.log("This is moongose error",err);
  }
}

module.exports = connectToDb;
