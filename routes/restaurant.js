const express = require("express")
const router = express.Router()
const Restaurant = require("../models/Restaurant")
const User = require("../models/User")

router.get("/add", (req, res, next) => res.render("restaurant/add", { "message": req.flash("error") }))

router.post("/add", (req, res, next) => {
const {name,logo, description,  address, latitude, longitude, foodStyle, specialties, healthLabels, phone, menu, website} = req.body

let location = {type: "Point", coodinates: [longitude, latitude]}

const newRestaurant = new Restaurant({name,logo, description, address, location, foodStyle, specialties, healthLabels, phone, menu, website})

newRestaurant.save()
.then(restaurants => res.redirect('/restaurant/all'))
.catch(err => next(err))
})

//from index to details of one restaurant
router.get("/details/:id", (req, res, next) => {
   console.log(req.params.id)

  Restaurant.findById(req.params.id)
    .then(restaurant=> {
      res.render("restaurant/details", {restaurant})
    })
    .catch(err => console.log('Error', err))
})

//Pushes review to reviews array of Restaurant model
router.post("/details/favorite/:id", (req, res, next) => {
  User.update({ _id: req.session.currentUser._id }, {$push: {favorites: req.params.id}})
  .then(user => res.redirect(`/restaurant/details/${req.params.id}`))
  .catch(error => console.log(error))
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