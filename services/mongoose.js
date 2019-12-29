const mongoose = require("mongoose");
const keys = require("../config/keys");

//Models
require("./../app/models/User");
require("./../app/models/Sensor");
require("./../app/models/Data");
require("./../app/models/Location");
require("./../app/models/PM");
mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true
  }
);
