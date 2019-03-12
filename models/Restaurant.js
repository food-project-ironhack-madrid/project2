const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const restSchema = new Schema({
  name: String,
  logo: String,
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

const Restaurant = mongoose.model('Restaurant', restSchema)
module.exports = Restaurant