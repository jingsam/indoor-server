const mongoose = require('mongoose')
const select = require('mongoose-json-select')


const LocationSchema = new mongoose.Schema({
  deviceId: { type: String, index: true },
  lng: Number,
  lat: Number
}, { timestamps: true })

LocationSchema.plugin(select, '-_id -__v')


module.exports = mongoose.model('Location', LocationSchema)
