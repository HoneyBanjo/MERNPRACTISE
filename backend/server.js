require('dotenv').config();

const express = require('express')
const port = process.env.PORT
const workoutRoutes = require('./routes/workouts')

// express app
const app = express();

// middleware to see what requests are coming to the server
app.use(express.json()) // parses incoming data in to the request object

// ^crucial jotta voi laittaa routessa req.body

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use("/api/workouts", workoutRoutes);

// listen for requests
app.listen(port, () => {
    console.log("listening on port ", port)
})