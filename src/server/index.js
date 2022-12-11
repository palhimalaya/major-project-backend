const express = require("express");
const app = express();
const port = 3008;
const authRouter = require("../routes/authRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// enabling CORS for all requests
app.use(cors());

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

(async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(
      "mongodb://0.0.0.0:27017/userdatabase",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();

app.use("/api/auth", authRouter);
