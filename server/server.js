const express = require("express");
const app = express();
const db = require("./config/connection");

const PORT = 3000;

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});
