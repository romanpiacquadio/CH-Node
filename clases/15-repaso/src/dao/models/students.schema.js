const mongoose = require('mongoose');

const studentsCollection = "Students";

const studentsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["M", "F"],
  },
  grade: {
    type: Number,
  },
  courses : {
    type: Array,
    default: [],
  },
});

const studentsModel = mongoose.model(studentsCollection, studentsSchema);
module.exports = studentsModel;