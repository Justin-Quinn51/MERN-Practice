const express = require('express')
const app = express()
const workoutRoutes = require('./backend/routes/workouts')
require('dotenv').config()
const mongoose = require('mongoose')

// Middleware
app.use(express.json())

app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

// Routes
app.use('/api/workouts', workoutRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log('connected to db and listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })


