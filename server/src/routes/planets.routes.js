const express = require('express')
const planetRoutes = express.Router()

const {
  getAllPlanets
} = require('./planets.controller')

planetRoutes.get('/', getAllPlanets)

module.exports = planetRoutes
