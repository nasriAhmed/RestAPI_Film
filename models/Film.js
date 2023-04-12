//Mongoose model

const mongoose = require("mongoose");

const filmshema = new mongoose.Schema({
  titre: { type: String, required: true },
  année: { type: Number, required: true },
  note: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

module.exports = mongoose.model("film", filmshema);
