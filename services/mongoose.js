const mongoose = require("mongoose");
const keys = require("../config/keys");

//Models
require("./../app/models/User");
require("./../app/models/Sensor");

mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true
  }
);
