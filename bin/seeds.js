require('dotenv').config();

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
    logo: "/images/avocado-love-logo.png",
    description: "First avocado bar in Madrid. Vegan and gluten-free restaurant where all dishes have avocado as one of the ingredients.",
    address: "Marqués de Santa Ana 34, Madrid, Spain",
    location:{type: "Point", coordinates: ["40.4252588","-3.7036406"]},
    foodStyle: "Vegan cuisine specialists in avocados",
    specialties: ["avocado", "hummus","aubergine","taco", "sweet potato"],
    healthLabel:["gluten-free", "vegan", "vegetarian"],
    phone: "+34 667201169",
    menu: "/images/avocado-love-menu.png",
    website: "https://avocadolove.es/"
  },
  {
    name: "Viva Burger",
    logo: "/images/viva-burger-logo.png",
    description: "Viva Burger is the result of years of work taking care of your health and that of our beloved planet earth. We bet on the taste in our ingredients without incurring any animal suffering.",
    address: "Costanilla de San Andrés, 16. 28005 Madrid, Spain",
    location:{type: "Point", coordinates: ["40.4138258","-3.7116641"]},
    foodStyle: "Vegetarian Burgers",
    specialties: ["wraps","burgers", "salad", "mushroom", "vegetable"],
    healthLabel:["gluten-free","vegetarian","paleo", "plant-based"],
    phone: "+34 91 366 33 49",
    menu: "/images/viva-burger-menu.png",
    website: "http://vivaburger.es/"
  },
  {
    name: "Honest greens",
    logo: "/images/honest-greens-logo.jpeg",
    description: "Eat real food. Eat like your ancestors. More vegetables, free-range meat, whole grains and seeds. Let nature decide what’s on the menu.",
    address: "Paseo de la Castellana, 8928046",
    location:{type: "Point", coordinates: ["40.4457662","-3.691435"]},
    foodStyle: "Healthy cuisine",
    specialties: ["sweet potato", "quinoa", "avocado","chimichurri", "pico de gallo", "hummus", "pumpkin"],
    healthLabel:["gluten-free", "vegetarian","paleo", "plant-based"],
    phone: "+34 914 21 50 11",
    menu: "/images/honest-greens-menu.jpg",
    website: "https://honestgreens.com/"
  },
  {
    name: "Triciclo",
    logo: "/images/triciclo-logo.png",
    description: "",
    address: "Calle de Sta. Maria, 28, Madrid, Spain",
    location:{type: "Point", coordinates: [40.4128929,-3.697243]},
    foodStyle: "spanish",
    specialties: ["oyster ","artichokes"],
    phone: "+34-910244798",
    menu: "/images/triciclo-menu.png",
    website: "http://eltriciclo.es/triciclo/"
  },
  {
    name: "Sahuaro",
    logo: "/images/sahuaro-logo.png",
    description: "",
    address: "Plaza de Cascorro, 2, Madrid, Spain",
    location:{type: "Point", coordinates: [40.411229,-3.707142]},
    foodStyle: "mexican",
    specialties: ["tacos"," burritos"],
    phone: "+34-914296449",
    menu: "/images/sahuaro-menu.png",
    website: "http://sahuaromadrid.com/"
  },
  {
    name: "Fratelli Figurato",
    logo: "/images/fratelli-figurato-logo.png",
    description: "Dos hermanos napolitanos y una pasión fortísima por la pizza. Una carrera prominente en Marketing en diferentes países, pero deciden dejarlo todo. Solo tienen un gran sueño. Reinventar la grande pizza napolitana utilizando como ingrediente secreto la innovación, haciéndola más ligera y utilizando productos increíbles de la tierra.",
    address: "Calle de Alonso Cano, 37, Madrid, Spain",
    location:{type: "Point", coordinates: [40.438911,-3.697848]},
    foodStyle: "italian",
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