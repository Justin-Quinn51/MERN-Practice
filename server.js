const express = require('express')
const app = express()
const workoutRoutes = require('./backend/routes/workouts')
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const PORT = 3000

// Middleware
app.use(express.json())

app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

app.use(express.static(path.resolve(__dirname, "./frontend/build")))

// Routes
app.use('/api/workouts', workoutRoutes)

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"))
})

// Connect to db
mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Connected to db and listening on port ${process.env.PORT || PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })


