const express = require('express')
const router  = express.Router()
const axios = require('axios')
const Restaurant = require("../models/Restaurant")


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

router.post('/', (req,res,next) =>{
  const search = req.body.searchFood
  const max = 6
  console.log(search)
  const getRecipeInfo = (arg) => {
    axios
    .get(`https://api.edamam.com/search?q=${search}&app_id=${process.env.APIID}&app_key=${process.env.APIKEYS}&from=0&to=${max}&diet=high-protein`)
    .then(recipes => {
        Restaurant.find({
          $or: [
            { foodStyle: search },
            { specialties: search }
          ]
        })
        .then(restaurants =>{
        console.log(recipes.data.hits.recipe)
        console.log(restaurants)
        res.render('food/food-search', {result:recipes.data.hits, search, restaurants})
    })
    .catch(err => console.log("An error ocurred: ", err))
  })
}
getRecipeInfo()
})

module.exports = router

$and: [
  { $or: [{a: 1}, {b: 1}] },
  { $or: [{c: 1}, {d: 1}] }
]