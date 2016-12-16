const Location = require('../models/location')


module.exports.create = function(req, res, next) {
  const deviceId = req.body.deviceId
  const lng = req.body.lng
  const lat = req.body.lat

  const location = new Location({
    deviceId,
    lng,
    lat
  })

  location.save((err) => {
    if (err) return next(err)

    res.json(location)
  })
}


module.exports.query = function(req, res, next) {
  const deviceId = req.query.deviceId
  const start = req.query.start ? new Date(req.query.start) : new Date(0)
  const end = req.query.end ? new Date(req.query.end) : new Date()

  const query = {
    createdAt: {
      $gte: start,
      $lte: end
    }
  }

  if (deviceId) query.deviceId = deviceId

  Location.find(query, (err, locations) => {
    if (err) return next(err)

    res.json(locations)
  })
}


