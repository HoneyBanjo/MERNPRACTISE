const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')


// get all workouts

const get_workouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get a single workout
const get_workout = async (req, res) => {
    const { id } = req.params // the part that is added after the route: "/:id"

   
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such workout"})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
      return res.status(404).json ({error: "no such workout"})
    }

    res.status(200).json(workout)
}



// create a new workout
const create_workout = async (req, res) => {
    const {title, load, reps} = req.body

    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// delete a new workout
const delete_workout = async (req, res) => {
    const { id } = req.params // the part that is added after the route: "/:id"

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such workout"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json ({error: "no such workout"})
      }
    
    res.status(200).json(workout)

}

// upodate a workout
const update_workout = async (req, res) => {
    const { id } = req.params // the part that is added after the route: "/:id"

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json ({error: "no such workout"})
      }
    
    res.status(200).json(workout)
}



// export files

module.exports = {
    create_workout,
    get_workouts,
    get_workout,
    delete_workout,
    update_workout
}
