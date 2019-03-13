const express = require("express")
const passport = require('passport')
const router = express.Router()

const User = require("../models/User")

const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") })
})

router.post('/login', (req, res, next) => {
  const usernameInput = req.body.username;
  const passwordInput = req.body.password;

  if (usernameInput === '' || passwordInput === '') {
    res.render('auth/login', {
      errorMessage: 'Enter both username and password to log in.'
    });
    return;
  }

  User.findOne({ username: usernameInput }, (err, theUser) => {
    if (err || theUser === null) {
      res.render('auth/login', {
        errorMessage: `There isn't an account with username ${usernameInput}.`
      });
      return;
    }

    if (!bcrypt.compareSync(passwordInput, theUser.password)) {
      res.render('auth/login', {
        errorMessage: 'Invalid password.'
      });
      return;
    }

    req.session.currentUser = theUser;
    res.redirect('/');
  });
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup")
})

router.post("/signup", (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email
  const role = req.body.role
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" })
    return
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" })
      return
    }

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    const newUser = new User({
      username,
      password: hashPass,
      email,
      role
    })

    newUser.save()
    .then(() => {
      res.redirect("/")
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" })
    })
  });
});

router.get('/logout', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/');
    return;
  }

  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }

    res.redirect('/');
  });
});

module.exports = router