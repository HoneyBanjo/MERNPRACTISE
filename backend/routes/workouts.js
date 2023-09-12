const express = require('express')
const Workout = require('../models/workoutModel')
const router = express();

// get all workouts
router.get("/", (req, res) => {
    res.json({mssg: "This is a get"})
})


// get single workout
router.get("/:id", async (req, res) => {
    const {title, load, reps} = req.body

    // add to the database
    try {
      const workout = await Workout.create({ title, load, reps })
      res.status(200).json(workout)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
})

// post workout
router.post("/", async (req, res) => {
    const {title, load, reps} = req.body

    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

})

router.delete("/:id", (req, res) => {
    res.json({mssg: "we are deleting"})
})

router.patch("/:id", (req, res) => {
    res.json({mssg: "updating"})
})


module.exports = router