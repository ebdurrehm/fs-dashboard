const {
  getAllLaunches,
  saveLaunch,
  abortLaunch
} = require('../models/launches.model')

async function httpGetAllLaunches (req, res) {
  res.status(200).json(await getAllLaunches())
}

async function postLaunch (req, res) {
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
  if (isNaN(new Date(req.body.launchDate))) {
    return res.status(400).json({
      error: 'invalid date format'
    })
  } else if (await saveLaunch(req.body)) {
    res.status(201).json({ message: 'saved' })
  } else {
    return res.status(500).json({
      errorMessage: 'something went wrong'
    })
  }
}

function httpDeleteLaunch (req, res) {
  const result = abortLaunch(+req.body.id)
  if (result.status === 'error') {
    return res.status(400).json({
      message: result.message
    })
  } else {
    return res.status(200).json({
      message: result.message
    })
  }
}

module.exports = {
  httpGetAllLaunches,
  postLaunch,
  httpDeleteLaunch
}
