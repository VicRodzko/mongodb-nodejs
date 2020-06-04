const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  activated: {
    type: Boolean,
    default: false,
  },
  assigned: {
    type: String,
    default: "",
  },
});

module.exports = model("Notification", schema);
