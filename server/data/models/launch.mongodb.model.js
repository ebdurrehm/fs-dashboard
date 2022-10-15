const mongoose = require('mongoose')

const launchSchema = new mongoose.Schema({
  flightNumber: { type: Number, default: 100, required: true },
  launchDate: { type: Date, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  target: { type: String, required: true },
  customers: [{ type: String, required: true }],
  upcoming: { type: Boolean, default: true, required: true },
  success: { type: Boolean, default: true, required: true }
})

module.exports = mongoose.model('launch', launchSchema)
