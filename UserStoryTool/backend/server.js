var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 5000;
//var Users = require("./routes/Users.js");
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Orign,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
  next();
});

var signup = require("./routes/registeration");
app.use("/users", signup);
var signin = require("./routes/login");
app.use("/users", signin);
var userstory = require("./routes/userstory");
app.use("/users", userstory);
var fetch = require("./routes/fetch");
app.use("/users",fetch);
var edits = require("./routes/edits");
app.use("/users",edits);

var supporttesting_insert = require("./routes/supporttesting_insert");
app.use("/users",supporttesting_insert);
var supporttesting_fetch = require("./routes/supporttesting_fetch");
app.use("/users",supporttesting_fetch);
var supporttesting_update = require("./routes/supporttesting_update");
app.use("/users",supporttesting_update);
var supporttesting_fetch_manager = require("./routes/supporttesting_fetch_manager");
app.use("/users",supporttesting_fetch_manager);

var registersubuserstories = require("./routes/registersubuserstories");
app.use("/users",registersubuserstories);
var subuserstoriesupdate = require("./routes/subuserstoriesupdate");
app.use("/users",subuserstoriesupdate);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
