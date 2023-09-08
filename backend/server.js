require('dotenv').config();

const express = require('express')
const port = process.env.PORT

// express app
const app = express();

// middleware to see what requests are coming to the server
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.get('/', (req, res)=> {
    res.json({mssg: "welcome to the app"})
})

// listen for requests
app.listen(port, () => {
    console.log("listening on port ", port)
})