const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
const { Schema } = mongoose;
const locationSchema = new Schema({
  Timestamp: String,
  Latitude : SchemaTypes.Double,
  Longitude : SchemaTypes.Double,
  Team :Number,
});

mongoose.model("location", locationSchema);
