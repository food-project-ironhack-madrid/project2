const express = require('express')
const router  = express.Router()
const axios = require('axios')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

// const getRecipeInfo = (arg) => {
//     axios
//     .get(`https://api.edamam.com/search?q=chicken&app_id=APIID&app_key=APIKEY&from=0&to=1&diet=high-protein`)
//     .then(res => {
//         console.log(res.data.hits)
//     })
//     .catch(err => console.log("An error ocurred: ", err))
// }

// getRecipeInfo()

module.exports = router