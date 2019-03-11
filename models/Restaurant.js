const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const restSchema = new Schema({
  name: String,
  description: String,
  address: String,
  location: {type: {type: String}, coordinates: [Number]},
  foodStyle: String,
  specialties: [String],
  phone: String,
  menu: String,
  website: String,
}, {
  timestamps: true
});

const Rest = mongoose.model('Rest', restSchema);
module.exports = Rest;