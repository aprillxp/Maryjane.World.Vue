const express = require("express");
const Controller = require("../controller");
const authentication = require("../middlewares/authentication");
const errorHandlers = require("../middlewares/errorHandler");
const router = express.Router();

// login - register
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-login", Controller.googleLogin);

// public consume
router.get('/movies', Controller.movies)
router.get('/movies/:id', Controller.movieDetail)

// middleware
router.use(authentication)

// subscription
router.patch('/subscription', Controller.subsription)
router.post('/midtrans-token', Controller.midtransToken)

// favorites
router.get('/favorites', Controller.favorites)
router.post('/favorites/:MovieId', Controller.postFavorites)

// error handler
router.use(errorHandlers)

module.exports = router