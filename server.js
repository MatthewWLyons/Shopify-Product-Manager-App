const express = require("express");
const bodyParser = require("body-parser");

const users = require("./routes/users");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Routes
app.use("/api", users);
app.use("*", (req, res, next) => {});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
