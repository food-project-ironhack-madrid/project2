const express = require("express")
const router = express.Router()

const Restaurant = require("../models/Restaurant")

router.get("/add", (req, res, next) => {
  res.render("restaurant/add", { "message": req.flash("error") })
})

router.post("/add", (req, res, next) => {
  const {name,logo, description,  address, latitude, longitude, foodStyle, specialties, phone, menu, website} = req.body

  let location = {
      type: "Point",
      coodinates: [longitude, latitude]
  }

const newRestaurant = new Restaurant({name,logo, description, address, location, foodStyle, specialties, phone, menu, website})

newRestaurant.save()
.then(restaurants => res.redirect('/restaurant/all'))
.catch(err => next(err))
})

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
  console.log(req.params.id)
})


router.get("/show", (req,res,next) => {
  Restaurant.find()
  .then(restaurants => res.render("restaurant/show", {restaurants}))
  .catch(err => console.log(err))

})



module.exports = router;
