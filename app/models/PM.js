const mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
const { Schema } = mongoose;
const pmSchema = new Schema({
  Timestamp: String,
  pm : SchemaTypes.Double,
});

mongoose.model("pm", pmSchema);
