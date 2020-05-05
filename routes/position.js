const express = require('express')
const contoller = require('../controllers/position')
const router = express.Router()

router.get('/:categoryId', contoller.getByCategoryId)
router.post('/', contoller.create)
router.patch('/:id', contoller.update)
router.delete('/:id', contoller.remove)

module.exports = router