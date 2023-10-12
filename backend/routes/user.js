const express = require('express')


// controller functions
const { loginUser, signupUser, getinfoUser, updateinfoUser } = require('../controllers/userController')

const router = express.Router()


// login route
router.post("/login", loginUser)


// signup route
router.post("/signup", signupUser)

// get info page
router.get("/info/:id", getinfoUser)

// update user info page
router.post("/info/:id", updateinfoUser)





module.exports = router




