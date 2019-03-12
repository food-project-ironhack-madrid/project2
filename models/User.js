const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


// const {Schema, model} = require("mongoose");
// // Esto es igual a lo que hacemos siempre que es:
// /*
//   const mongoose = require("mongoose");
//   const Schema = mongoose.Schema;
// */


const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
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
