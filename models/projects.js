const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProjectsSchema = new Schema({
  name: {
    type: String,
    required: [true, "The text field is required"]
  },
  notes: [
    {
      type: String
    }
  ],
  owner: {
    type: String,
    required: [true, "The text field is required"]
  }
});

const Projects = mongoose.model("projects", ProjectsSchema);

module.exports = Projects;
