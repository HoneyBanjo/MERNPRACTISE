const openai = require('../config/openaiConfig')
const Workout = require('../models/workoutModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')


// get all workouts
const get_workouts = async (req, res) => {
    const user_id = req.user._id

  const workouts = await Workout.find({user_id}).sort({createdAt: -1})

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
    const user_id = req.user._id

    let emptyFields = []

    if(!title) {
        emptyFields.push("title")
    }
    if(!load) {
        emptyFields.push("load")
    }
    if(!reps) {
        emptyFields.push("reps")
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Plaease fill in all the fields", emptyFields})
    }

    try {
        // Create the workout
        const workout = await Workout.create({title, load, reps, user_id})

        // find the user by id
        const user = await User.findById(user_id);

        // if no user, send no user
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Add the workout to the user's workout history
        user.workoutHistory.push({
        workout: workout._id, // Reference to the new workout
        title, title,
        date: new Date(), // Add the current date or a date associated with the workout
        reps: reps,
        load: load,
      });
        
        // Save the updated user document with the workout history
        await user.save();

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

// recommend workout !!!!!!!!!!!!!!!!
const generate_workout = async ( req, res) => {
    const {gender, weight, height} = req.body
    
    console.log(gender, weight, height)


    const workout = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            "role": "user",
            "content": `Create a workout of 4 exercises for a ${gender} with the height of ${height} and weight of ${weight} and give it in this format: Exercise: exercise, Load: load, Repetitions: repetitions. No extra advice.`,
        }]
    })

    // add the workout to a Users workout suggestions History??



    res.status(200).json({
        workout: workout.choices[0].message
      })

    // res.status(200).json(infos)

}


// export files

module.exports = {
    create_workout,
    get_workouts,
    get_workout,
    delete_workout,
    update_workout,
    generate_workout
}
