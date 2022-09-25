const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const planetRoutes = require('./routes/planets.routes')
const launchRoutes = require('./routes/launches.routes')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'view'))
app.use(cors({
  origin: 'http://localhost:300'
}))
app.use(express.json())
app.use(morgan('short'))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('/planets', planetRoutes)
app.use('/launches', launchRoutes)

module.exports = app
