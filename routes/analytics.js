const express = require('express')
const contoller = require('../controllers/analytics')
const router = express.Router()

router.get('/overview', contoller.overview)
router.get('/analytics', contoller.analytics)

module.exports = router