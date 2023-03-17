const express = require("express");
const { message } = require("./message");
const { OK } = require("./messageType");

function createServer() {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    message(res, OK, "Welcome to the Official Arcade API");
  });

  return app;
}

module.exports = createServer;
