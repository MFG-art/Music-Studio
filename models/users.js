const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  username: {
    type: String,
    required: [true, "The text field is required"]
  },
  password: {
    type: String,
    required: [true, "The text field is required"]
  }
});

const Users = mongoose.model("users", UsersSchema);

module.exports = Users;
