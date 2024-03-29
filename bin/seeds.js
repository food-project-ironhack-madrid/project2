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
    address: "Marqués de Santa Ana 34, Madrid",
    location:{type: "Point", coordinates: ["40.4252588","-3.7036406"]},
    foodStyle: "Vegan cuisine specialized in avocados",
    specialties: ["avocado", "hummus","aubergine", "sweet potato"],
    healthLabel:["gluten-free", "vegan", "vegetarian"],
    phone: "+34 667201169",
    menu: "/images/avocado-love-menu.png",
    website: "https://avocadolove.es/"
  },
  {
    name: "Viva Burger",
    logo: "/images/viva-burger-logo.png",
    description: "Viva Burger is the result of years of work taking care of your health and that of our beloved planet earth. We bet on the taste in our ingredients without incurring any animal suffering.",
    address: "Costanilla de San Andrés, 16, Madrid",
    location:{type: "Point", coordinates: ["40.4138258","-3.7116641"]},
    foodStyle: "Vegetarian Burgers",
    specialties: ["wraps","burgers", "salad", "mushroom", "tacos", "vegetable"],
    healthLabel:["gluten-free","vegetarian","paleo","plant-based"],
    phone: "+34 91 366 33 49",
    menu: "/images/viva-burger-menu.png",
    website: "http://vivaburger.es/"
  },
  {
    name: "Honest greens",
    logo: "/images/honest-greens-logo.jpeg",
    description: "Eat real food. Eat like your ancestors. More vegetables, free-range meat, whole grains and seeds. Let nature decide what’s on the menu.",
    address: "Paseo de la Castellana, 89, Madrid",
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
    description: "La ilusión de tres cocineros de acercar una gastronomia de elite a todos aquellos que disfruten de la mezcla de sabores y de probar diferentes productos.",
    address: "Calle de Sta. Maria, 28, Madrid",
    location:{type: "Point", coordinates: [40.4128929,-3.697243]},
    foodStyle: "Contemporary spanish food",
    specialties: ["oyster ","artichokes","tuna","steak tartare","shrimp"],
    healthLabel: ["gluten-free","peanut-free","tree-nut-free"] ,
    phone: "+34-910244798",
    menu: "/images/triciclo-menu.png",
    website: "http://eltriciclo.es/triciclo/"
  },
  {
    name: "Sahuaro",
    logo: "/images/sahuaro-logo.png",
    description: "Apostamos por mostrar un México que no solo va de multicolores, luchadores y mariachis. Mostramos un México más de ritual, más rustico y más real.",
    address: "Plaza de Cascorro, 2, Madrid",
    location:{type: "Point", coordinates: [40.411229,-3.707142]},
    foodStyle: "Mexican food",
    specialties: ["tacos"," burritos","guacamole","nachos","quesadillas"],
    healthLabel: ["tree-nut-free","peanut-free","fish-free"],
    phone: "+34-914296449",
    menu: "/images/sahuaro-menu.png",
    website: "http://sahuaromadrid.com/"
  },
  {
    name: "Fratelli Figurato",
    logo: "/images/fratelli-figurato-logo.png",
    description: "Dos hermanos napolitanos y una pasión fortísima por la pizza. Deciden dejarlo todo y solo tienen un gran sueño. Reinventar la gran pizza napolitana.",
    address: "Calle de Alonso Cano, 37, Madrid",
    location:{type: "Point", coordinates: [40.438911,-3.697848]},
    foodStyle: "Napoli style pizzas",
    specialties: ["pizza", "calzone"],
    healthLabel: ["tree-nut-free","peanut-free","fish-free"] ,
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