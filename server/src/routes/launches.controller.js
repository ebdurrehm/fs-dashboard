const {
  getAllLaunches,
  saveLaunch
} = require('../models/launches.model')

function httpGetAllLaunches (req, res) {
  console.log(`controller launches ${getAllLaunches()}`)
  res.status(200).json(getAllLaunches())
}

function postLaunch (req, res) {
  if (
    !req.body.target ||
    !req.body.mission ||
    !req.body.launchDate ||
    !req.body.rocket
  ) {
    return res.status(400).json({
      error: 'one of the launch properties is missed'
    })
  }
  if (!isNaN(req.body.launchDate)) {
    return res.status(400).json({
      error: 'invalid date format'
    })
  } else {
    saveLaunch(req.body)
    res.status(200).json({ status: 'saved' })
  }
}

module.exports = {
  httpGetAllLaunches,
  postLaunch
}
