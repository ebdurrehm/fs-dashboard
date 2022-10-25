const planets = require('../../data/models/planet.mongodb.model')

async function getAllPlanets (req, res) {
  return res.status(200).json((await planets.find({}, { _id: 0, __v: 0 })))
}

module.exports = {
  getAllPlanets
}
