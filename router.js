const router = require('express').Router()
const locations = require('./controllers/location')


router.post('/locations', locations.create)
router.get('/locations', locations.query)


module.exports = router
