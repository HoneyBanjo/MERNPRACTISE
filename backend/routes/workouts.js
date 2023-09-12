const express = require('express')
const {
    create_workout, 
    get_workouts, 
    get_workout, 
    delete_workout, 
    update_workout
} = require('../controllers/workoutController')
const router = express();

// get all workouts
router.get("/", get_workouts)


// get single workout
router.get("/:id", get_workout)

// post workout
router.post("/", create_workout)

router.delete("/:id", delete_workout)

router.patch("/:id", update_workout)


module.exports = router