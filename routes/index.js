require('dotenv').config()

const express = require('express')
const router  = express.Router()
const axios = require('axios')
const Restaurant = require("../models/Restaurant")

router.get('/', (req, res, next) => {

  Restaurant.find()
  .then(restaurants =>  res.render('index'))
  .catch(err => {console.log(err)})

})

/* FOOD API */
router.post('/', (req,res,next) =>{
  const search = req.body.searchFood
  const max = 6
  let errorMessage = ''
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
        .then(restaurants => {
          console.log(recipes.data.hits)
        if(restaurants.length === 0){ //comprueba si la busqueda no dio resultados
          res.render('food/food-search', {
            errorMessage: `Results for ${search} couldn't be found.`
          });
          return;
        }
        res.render('food/food-search', {result:recipes.data.hits, search, restaurants, errorMessage})
    })
    .catch(err => console.log("An error ocurred: ", err))
  })
}
getRecipeInfo()
})

router.get("/about", (req, res, next) => res.render("about", { "message": req.flash("Error getting about page") }))

module.exports = router