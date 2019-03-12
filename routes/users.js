const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/users", (req,res) => res.render("profile/users"))




module.exports = router;