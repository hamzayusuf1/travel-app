const { connect, connection, set } = require("mongoose");
set("strictQuery", true);
require("dotenv").config();

connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
