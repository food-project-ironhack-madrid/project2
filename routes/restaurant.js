const express = require("express")
const router = express.Router()
const Restaurant = require("../models/Restaurant")
const User = require("../models/User")
const uploadCloud = require('../config/cloudinary.js');

router.get("/add", (req, res, next) => res.render("restaurant/add", { "message": req.flash("error") }))

router.post("/add",uploadCloud.single('photo'), (req, res, next) => {
const {name, description,  address, latitude, longitude, foodStyle, specialties, healthLabel, phone, menu, website} = req.body
const owner = req.session.currentUser._id
const logo = req.file.url;
const imgName = req.file.originalname;
 
let location = {type: "Point", coodinates: [longitude, latitude]}

const newRestaurant = new Restaurant({name,logo, owner, description, address, location, foodStyle, specialties, healthLabel, phone, logo, imgName, website})

newRestaurant.save()
.then(restaurants => res.redirect('/restaurant/show'))
.catch(err => next(err))
})

router.get('/edit/:id', (req, res, next) => {
  console.log("entra")
  Restaurant.findById(req.params.id)
    .then(restaurant=> {
      res.render("restaurant/edit", {restaurant})
    })
    .catch(err => console.log('Error', err))
})

router.post('/edit/:id', (req, res) => {
  const {name,logo, description,  address, latitude, longitude, foodStyle, specialties, healthLabel, phone, menu, website} = req.body
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  Restaurant.update({_id: req.params.id},  { $set: {name,logo, description,  address, latitude, longitude, foodStyle, specialties, healthLabel, phone, imgPath, imgName, menu, website}})
  .then(book    => res.redirect(`/restaurant/details/${req.params.id}`))
  .catch(err  => console.log(`Error editing restaurant: ${err}`))
})

//from index to details of one restaurant
router.get("/details/:id", (req, res, next) => {
  let isRestaurantOwner = false;
   console.log(req.params.id)
  Restaurant.findById(req.params.id)
    .then(restaurant=> {
      if(req.session.currentUser && req.session.currentUser._id === restaurant.owner){
        isRestaurantOwner = true
      }
      res.render("restaurant/details", {restaurant, isRestaurantOwner, result: JSON.stringify([restaurant])})
    })
    .catch(err => console.log('Error', err))
})

//Pushes review to reviews array of Restaurant model
router.post("/details/favorite/:id", (req, res, next) => {
  Restaurant.findById(req.params.id)
    .then(restaurant=> {
      User.update({ _id: req.session.currentUser._id }, {$push: {favorites: restaurant}})
      .then(user => res.redirect(`/restaurant/details/${req.params.id}`))
      .catch(error => console.log(error))
  })
})

router.post("/details/:id", (req, res, next) => {
  const { comments } = req.body
  const username = req.session.currentUser.username
  Restaurant.update({ _id: req.params.id }, { $push: { reviews: {username, comments }}})
  .then(restaurant => res.redirect(`/restaurant/details/${req.params.id}`))
  .catch(error => console.log(error))
})

/* this JSON shows the GOOGLE MAPS API */
router.get("/show", (req,res,next) => {
  Restaurant.find()
  .then(restaurants => res.render("restaurant/show", {restaurants, result: JSON.stringify(restaurants)}))
  .catch(err => console.log(err))
})

router.get("/menu/:id", (req, res, next) => {
  Restaurant.findById(req.params.id)
    .then(restaurant=> {res.render("restaurant/menu", {restaurant})})
    .catch(err => console.log('Error', err))
})
  
module.exports = router;