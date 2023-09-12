const express = require('express')
const router = express();

// get all workouts
router.get("/", (req, res) => {
    res.json({mssg: "This is a get"})
})


// get single workout
router.get("/:id", (req, res) => {
    res.json({mssg: "get single workout"})
})

// post workout
router.post("/", (req, res) => {
    req.body
    res.json({mssg: "posting stuff"})
})

router.delete("/:id", (req, res) => {
    res.json({mssg: "we are deleting"})
})

router.patch("/:id", (req, res) => {
    res.json({mssg: "updating"})
})


module.exports = router