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

function deleteLaunch (id) {
  if (!checkLaunchExist(id)) {
    return {
      status: 'error',
      message: 'this launch does not  exist'
    }
  } else {
    launches.delete(id)
    return {
      status: 'ok',
      message: 'deleted'
    }
  }
}

module.exports = {
  getAllLaunches,
  saveLaunch,
  deleteLaunch
}
