const express = require('express')
const launchRouter = express.Router()

const {
  httpGetAllLaunches,
  postLaunch,
  httpDeleteLaunch
} = require('./launches.controller')

launchRouter.get('/', httpGetAllLaunches)
launchRouter.post('/', postLaunch)
launchRouter.delete('/', httpDeleteLaunch)

module.exports = launchRouter
