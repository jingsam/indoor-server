const Location = require('../models/location')


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

module.exports.upload = function(req, res, next) {
  const location = new Location({
    deviceId: req.body.deviceId,
    longtitude: req.body.longtitude,
    latitude: req.body.latitude
  })

  location.save(function(err, location) {
    if (err) return next(err)

    res.json(location)
  })
}
