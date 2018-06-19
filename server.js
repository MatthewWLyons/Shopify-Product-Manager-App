const express = require("express");
const bodyParser = require("body-parser");

const users = require("./routes/users");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use("/add", express.static("client/build"));
  app.use("/edit/*", express.static("client/build"));
}

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Routes
app.use("/api", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
