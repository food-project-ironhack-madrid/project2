require('dotenv').config();

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");

mongoose
  .connect(process.env.DB, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let restaurants = [
  {
    name: "Avocado Love",
    logo: "/images/avocado-love-logo.jpg",
    description: "First avocado bar in Madrid. Vegan and gluten-free restaurant where all dishes have avocado as one of the ingredients.",
    address: "Marqués de Santa Ana 34, Madrid, Spain",
    location:{type: "Point", coordinates: ["40.4252588","-3.7036406"]},
    foodStyle: "Vegan",
    specialties: ["Gluten-free","Avocado"],
    phone: "+34 667201169",
    menu: "/images/avocado-love-menu.png",
    website: "https://avocadolove.es/"
  },
  {
    name: "Viva Burger",
    logo: "/images/viva-burger-logo.png",
    description: "EATING IS A DAILY ACT OF LOVE. Viva Burger is the result of years of work taking care of your health and that of our beloved planet earth. We bet on the taste in our ingredients without incurring any animal suffering. Eat conscious and you will be much happier.",
    address: "Costanilla de San Andrés, 16. 28005 Madrid, Spain",
    location:{type: "Point", coordinates: ["40.4138258","-3.7116641"]},
    foodStyle: "Vegan",
    specialties: ["Wraps","Burgers", "Homemade pies", "Salads"],
    phone: "+34 91 366 33 49",
    menu: "/images/viva-burger-menu.png",
    website: "http://vivaburger.es/"
  },
  {
    name: "Honest greens",
    logo: "/images/honest-greens-logo.jpeg",
    description: "Eat real food.Eat like your ancestors. More vegetables, free-range meat, whole grains and seeds. Embrace the seasons. Let nature decide what’s on the menu.",
    address: "Paseode la Castellana, 8928046",
    location:{type: "Point", coordinates: ["40.4457662","-3.691435"]},
    foodStyle: "Healthy cuisine",
    specialties: ["sweet potato", "quinoa"],
    phone: "+34 914 21 50 11",
    menu: "/images/honest-greens-menu.jpg",
    website: "https://honestgreens.com/"
  },
  {
    name: "Triciclo",
    description: "",
    address: "Calle de Sta. Maria, 28, Madrid, Spain",
    location:{type: "Point", coordinates: [40.4128929,-3.697243]},
    foodStyle: "Spanish",
    specialties: ["oyster ","artichokes "],
    phone: "+34-910244798",
    menu: "/images/triciclo-menu.png",
    website: "http://eltriciclo.es/triciclo/"
  },
  {
    name: "Sahuaro",
    description: "",
    address: "Plaza de Cascorro, 2, Madrid, Spain",
    location:{type: "Point", coordinates: [40.411229,-3.707142]},
    foodStyle: "Mexican",
    specialties: ["tacos"," burritos"],
    phone: "+34-914296449",
    menu: "/images/sahuaro-menu.png",
    website: "http://sahuaromadrid.com/"
  },
  {
    name: "Fratelli Figurato",
    description: "Dos hermanos napolitanos y una pasión fortísima por la pizza. Una carrera prominente en Marketing en diferentes países, pero deciden dejarlo todo. Solo tienen un gran sueño. Reinventar la grande pizza napolitana utilizando como ingrediente secreto la innovación, haciéndola más ligera y utilizando productos increíbles de la tierra.",
    address: "Calle de Alonso Cano, 37, Madrid, Spain",
    location:{type: "Point", coordinates: [40.438911,-3.697848]},
    foodStyle: "Italian",
    specialties: ["pizza","calzone"],
    phone: "+34-914857993",
    menu: "/images/fratelli-figurato-menu.png",
    website: "https://www.fratellifigurato.es/"
  },
]

Restaurant.deleteMany()
.then(() => {
 return Restaurant.create(restaurants)
})
.then(restaurantsCreated => {
 //console.log(`${restaurantsCreated.length} users created with the following id:`);
 //console.log(restaurantsCreated.map(u => u._id));
})
.then(() => {
 // Close properly the connection to Mongoose
 mongoose.disconnect()
})
.catch(err => {
 mongoose.disconnect()
 throw err
})