const express = require("express")
const router = express.Router()
const Restaurant = require("../models/Restaurant")
const User = require("../models/User")

router.get("/users", (req,res) => {
    Restaurant.find()
    .then(restaurants => res.render("profile/users", {restaurants}))
    .catch(err => console.log(err))
})

module.exports = router;