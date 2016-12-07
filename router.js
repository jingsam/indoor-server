const router = require('express').Router()
const locations = require('./controllers/location')


router.get('locations', locations.query)
router.post('locations', locations.upload)
