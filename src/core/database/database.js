const mongoose = require("mongoose");
const { MONGODB } = require("../../config");

const startDataBaseConnection = () => mongoose.connect(MONGODB.CONNECTION_STRING);

module.exports = startDataBaseConnection;