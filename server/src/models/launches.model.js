
const launches = require('../../data/models/launch.mongodb.model')
const planets = require('../../data/models/planet.mongodb.model')

async function getAllLaunches () {
  return await launches.find({}, { _id: 0, __v: 0 })
}

async function saveLaunch (launch) {
  if (await checkTargetExist(launch.target)) {
    console.log(await checkTargetExist(launch.target))
    return await saveLaunchToDb(launch)
  } else {
    return false
  }
}

async function checkLaunchExist (id) {
  const result = await launches.findOne({ flightNumber: id })
  return !!result
}

async function abortLaunch (id) {
  if (!await checkLaunchExist(id)) {
    return {
      message: 'this launch does not  exist',
      status: 'error'
    }
  } else {
    await launches.findOneAndUpdate({ flightNumber: id }, {
      upcoming: false,
      success: false
    })
    return {
      status: 'ok',
      message: 'deleted'
    }
  }
}

async function checkTargetExist (target) {
  const result = await planets.findOne({ kepler_name: target })
  return !!result
}

async function saveLaunchToDb (launch) {
  try {
    return await launches.updateOne({ mission: launch.mission }, {
      flightNumber: await getLatestFlightNumber(),
      customers: ['Nasa', 'Azerspace'],
      success: true,
      upcoming: true,
      ...launch
    }, { upsert: true })
  } catch (err) {
    console.log(err)
  }
}

async function getLatestFlightNumber () {
  const result = await launches.findOne({}).sort({ flightNumber: -1 })
  console.log(result)
  return result ? result.flightNumber + 1 : 100
}

module.exports = {
  getAllLaunches,
  saveLaunch,
  abortLaunch
}
