const express = require('express')
const contoller = require('../controllers/category')
const router = express.Router()

router.get('/', contoller.getAll)
router.get('/:id', contoller.getById)
router.delete('/:id', contoller.remove)
router.post('/', contoller.create)
router.patch('/:id', contoller.update)

module.exports = router