const mongoose = require('mongoose')

async function connectMongodb (string) {
  try {
    await mongoose.connect(string, {
      dbName: 'NASA'

    })
    console.log('The connection to mongodb is established successfully')
  } catch (err) {
    console.err(err)
  }
}

async function disconnectMongodb () {
  try {
    await mongoose.disconnect()
  } catch (err) {
    console.err(err)
  }
}

module.exports = {
  connectMongodb,
  disconnectMongodb
}
