const express = require('express')
const router = express.Router()
const { saveMove, getMove, updateMove, getAllMoves } = require('../../controllers/moveController')
const { protect } = require('../../middleware/authMiddleware')

router.post('/', protect, saveMove)
router.get('/:id', protect, getMove)
router.put('/:id', protect, updateMove)
router.get('/', protect, getAllMoves)

module.exports = router