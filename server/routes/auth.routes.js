const authController = require("../controller/auth.controller")

const router = require("express").Router()

router

    // .post("/register", authController.registerUser)
    .post("/login", authController.loginUser)
    .post("/logout", authController.logoutUser)

module.exports = router