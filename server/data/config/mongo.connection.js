const mongoose = require('mongoose')

async function connectMongodb (string) {
  try {
    await mongoose.connect(string, {
      dbName: 'NASA'

    })
    console.log('The connection to mongodb is established successfully')
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectMongodb
