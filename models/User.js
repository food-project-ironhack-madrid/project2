const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  favorites: [Object],
  imgName: String,
  imgPath: String,
  role: {
    type: String,
    enum: ['RESTAURANT', 'FOODTASTER'],
    default: 'FOODTASTER'
  },
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;