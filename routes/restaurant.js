const express = require("express")
const router = express.Router()
const Restaurant = require("../models/Restaurant")
const session    = require("express-session")


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
      console.log(restaurant)
      res.render("restaurant/details", {restaurant})
    })
    .catch(err => console.log('Error', err))
})

router.post("/details/:id", (req, res, next) => {
  const { comments } = req.body;
  console.log(currentUser)
  const username = currentUser
  console.log(username, comments, req.params)
  Restaurant.update({ _id: req.params.id }, { $push: { reviews: { username, comments }}})
  .then(restaurant      => res.redirect('/'))
  .catch(error    => console.log(error))
  console.log(req.params.id)
})




router.get("/show", (req,res,next) => {
  Restaurant.find()
  .then(restaurants => res.render("restaurant/show", {restaurants}))
  .catch(err => console.log(err))
})


  router.get("/menu/:id", (req, res, next) => {
  
    Restaurant.findById(req.params.id)
      .then(restaurant=> {res.render("restaurant/menu", {restaurant})})
      .catch(err => console.log('Error', err))
    })
  


module.exports = router;