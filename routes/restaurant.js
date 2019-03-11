const express = require("express");
const router = express.Router();

router.get("/add", (req, res, next) => {
  res.render("restaurant/add", { "message": req.flash("error") });
})



module.exports = router;
