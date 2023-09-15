require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


const port = process.env.PORT

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
app.use("/api/user", userRoutes);

// // connect to DB CLOUD
// mongoose.connect(process.env.ATLASCONN)
// .then(() => {
//     // listen for requests
//     app.listen(port, () => {
//     console.log("Connected to DB Cloud and listening on port ", port)
// })
// })
// .catch ((error) => {
//     console.log(error)
// })

// Connect to DB LOCAL
mongoose.connect(process.env.LOCALCONN)
.then(() => {
    // listen for requests
    app.listen(port, () => {
    console.log("Connected to DB Local and listening on port ", port)
})
})
.catch ((error) => {
    console.log(error)
})



