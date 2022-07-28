const express = require('express')
const app = express()
const workoutRoutes = require('./backend/routes/workouts')
require('dotenv').config()
const mongoose = require('mongoose')
const PORT = 3000

// Middleware
app.use(express.json())

app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

if (process.env.MONGO_URI === 'production') {
	app.use(express.static('./frontend/src/App.js'));
}

// Routes
app.use('/api/workouts', workoutRoutes)

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, './frontend/src', 'App.js'));
});


// Connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Connected to db and listening on port ${process.env.PORT || PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })


