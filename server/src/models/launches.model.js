const launches = new Map()
const crypto = require('crypto')
const flightNumber = crypto.randomInt(1000)

const launch = {
  flightNumber: 101,
  launchDate: new Date('February 23,2022'),
  mission: 'exploring Mars',
  rocket: 'Explorer IS1',
  target: 'kapler 101',
  customers: ['nasa', 'fbi'],
  upcoming: true,
  success: true
}
launches.set(launch.launchNumber, launch)

function getAllLaunches () {
  return Array.from(launches.values())
}

function saveLaunch (launch) {
  launches.set(flightNumber, {
    ...launch,
    upcoming: true,
    success: true,
    customers: ['NASA', 'AzerSpace'],
    flightNumber
  })
  console.log(`launches ${JSON.stringify(Array.from(launches.values()))}`)
}

function checkLaunchExist (id) {
  return launches.has(id)
}

function abortLaunch (id) {
  if (!checkLaunchExist(id)) {
    return {
      status: 'error',
      message: 'this launch does not  exist'
    }
  } else {
    const launch = launches.get(id)
    launch.upcoming = false
    launch.success = false
    return {
      status: 'ok',
      message: 'deleted'
    }
  }
}

module.exports = {
  getAllLaunches,
  saveLaunch,
  abortLaunch
}
