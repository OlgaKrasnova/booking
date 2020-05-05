const express = require('express')
const contoller = require('../controllers/order')
const router = express.Router()

router.get('/', contoller.getAll)
router.post('/', contoller.create)

module.exports = router