
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        // required: true
    },
    weight: {
        type: String,
        // required: true
    },
    height: {
        type: String,
        // required: true
    },
    age: {
        type: String,
        required: false
    },
    medicalConditions: {
        type: String,
        // required: true
    },
    injuries: {
        type: String,
        // required: true
    },
    injuryHistory: {
        type: String,
        // required: true
    },
    exerciseHistory: {
        type: String,
        // required: true
    },
    exercisePreferences: {
        type: String,
        // required: true
    },
    dislikedExercises: {
        type: String,
        // required: true
    },
    fitnessGoals: {
        type: String,
        // required: true
    },
    timeCommitment: {
        type: String,
        // required: true
    },
    equipmentAccess: {
        type: String,
        // required: true
    },
    stressLevels: {
        type: String,
        // required: true
    },
    sleepPatterns: {
        type: String,
        // required: true
    },
    dietaryHabits: {
        type: String,
        // required: true
    },
    dietaryRestrictions: {
        type: String,
        // required: true
    },
    workoutHistory: [
        {
          workout: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workout', // Reference to the Workout collection
          },
          title: String,
          date: Date,
          reps: Number,
          load: Number,
        },
      ],
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}



// static login method
userSchema.statics.login = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user

}

module.exports = mongoose.model('User', userSchema)