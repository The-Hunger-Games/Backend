const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");

//environment variable or you can say constants
env.config();

//mongodb connection
mongoose.set("strictQuery", true);
mongoose
  .connect(`${process.env.MONGO_DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  });
mongoose.set("debug", false);

// cors
app.use(cors());

// parse requests
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

// compress all responses
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  }),
);

//routes

//import parent router

const parentRouter = require("./router");

//use parent router

app.use("/", parentRouter);

// app listen

if (process.env.DEVELOPMENT) {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
} else {
  module.exports = app;
}
