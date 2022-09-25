const express = require('express')
const launchRouter = express.Router()

const {
  httpGetAllLaunches,
  postLaunch
} = require('./launches.controller')

launchRouter.get('/', httpGetAllLaunches)
launchRouter.post('/', postLaunch)

module.exports = launchRouter
