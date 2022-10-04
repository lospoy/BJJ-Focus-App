const express = require('express')
const router = express.Router()
const { saveVariation, getVariation, updateVariation, getAllVariations } = require('../../controllers/bjj_controllers/variationController')
const { protect } = require('../../middleware/authMiddleware')

router.post('/', protect, saveVariation)
router.get('/:id', protect, getVariation)
router.put('/:id', protect, updateVariation)
router.get('/', protect, getAllVariations)

module.exports = router