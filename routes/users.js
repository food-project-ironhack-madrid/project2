const express = require("express")
const router = express.Router()

const User = require("../models/User")

router.get("/users", (req,res) => res.render("profile/users"))




module.exports = router;