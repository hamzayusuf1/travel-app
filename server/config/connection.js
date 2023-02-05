const { connect, connection, set } = require("mongoose");
set("strictQuery", true);

connect("mongodb://localhost/travelDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
