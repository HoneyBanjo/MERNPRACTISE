const express = require('express')


// controller functions
const { loginUser, signupUser, infoUser } = require('../controllers/userController')

const router = express.Router()


// login route
router.post("/login", loginUser)


// signup route
router.post("/signup", signupUser)

// user info page
router.post("/info/:id", infoUser)




module.exports = router




