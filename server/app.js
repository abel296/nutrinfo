require('dotenv').config()

// DB connection
require('./config/db.config')

// Debug
require('./config/debug.config')

// App
const express = require('express')
const app = express()

// App settings
require('./config/middleware.config')(app)
require('./config/locals.config')(app)
require('./config/cors.config')(app)
require('./config/passport.config')(app)

// Routes index
require('./routes')(app)

module.exports = app

// Middleware to send index.html inside the build to the client
app.use((req, res) => res.sendFile(__dirname + "/public/index.html"));