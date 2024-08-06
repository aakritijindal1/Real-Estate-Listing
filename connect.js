const mongoose = require("mongoose");

async function connectToMongoDB(Property) {
  return mongoose.connect(Property);
}

module.exports = {
  connectToMongoDB,
};
