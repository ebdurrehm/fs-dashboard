const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')
const planets = require('../../data/models/planet.mongodb.model')

function isHabitablePlanet (planet) {
  return planet.koi_disposition === 'CONFIRMED' &&
  planet.koi_insol > 0.36 && planet.koi_insol < 1.11 &&
  planet.koi_prad < 1.6
}
function deployDataToDB () {
  fs.createReadStream(path.resolve(__dirname, '..', '..', 'data', 'data.csv'))
    .pipe(csv({
      skipComments: true
    })).on('data', async (data) => {
      if (isHabitablePlanet(data)) {
        await planets.updateOne({ kepler_name: data.kepler_name }, {
          kepler_name: data.kepler_name
        }, { upsert: true })
      }
    }).on('error', (err) => {
      console.log(err)
    }).on('end', async (data) => {
      const planetSize = (await planets.find({})).length
      console.log(`${planetSize} habitable planets found`)
    })
}

module.exports = deployDataToDB
