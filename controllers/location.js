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
  const start = req.query.start
  const end = req.query.end

  let query = {
    deviceId,
    createdAt: {
      $gte: Date(start),
      $lte: Date(end)
    }
  }

  Location.find(query, function(err, locations) {
    if (err) return next(err)

    res.json(locations)
  })
}


