const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const restSchema = new Schema({
  name: String,
  owner: String,
  logo: String,
  description: String,
  address: String,
  location: {type: {type: String}, coordinates: [Number]},
  foodStyle: String,
  specialties: [String],
  healthLabel: [String],
  phone: String,
  menu: String,
  imgName: String,
  imgPath: String,
  website: String,
  reviews: [ 
    {
      username:String,
      comments: String
    } 
  ]
}, {
  timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restSchema)
module.exports = Restaurant