const express = require('express')
const router = express.Router()
const { saveSession } = require('../controllers/sessionController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, saveSession)
// router.put('/:id', protect, updateHuman)
// router.get('/:id', protect, getHuman)
// router.get('/', protect, getAllHumans)

module.exports = router