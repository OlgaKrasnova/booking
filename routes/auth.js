const express = require('express')
const contoller = require('../controllers/auth')
const router = express.Router()

//localhost:5000/api/auth/login
router.post('/login', contoller.login)

//localhost:5000/api/auth/register
router.post('/register', contoller.register)

module.exports = router