const express = require('express')
const router = express.Router()
const { registerHuman, getHuman, updateHuman } = require('../controllers/humanController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerHuman)
router.post('/:id', protect, updateHuman)
router.get('/:id', protect, getHuman)

module.exports = router