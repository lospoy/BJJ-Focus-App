const asyncHandler = require('express-async-handler')
const Variation = require('../models/variationModel')
const User = require('../models/app_models/userModel')

// @desc    Save new variation
// @route   POST /api/techniques/variations
// @access  Public
const saveVariation = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    // Check if variation exists
    const variationExists = await Technique.findOne({ name: name })

    if (variationExists) {
        res.status(400)
        throw new Error(`Technique dated ${date} already exists`)
    }

    // ************ TBD
    // Check for user permission to save variation
    // Must be admin or teacher
    // const isAdmin = req.user.permissions.admin === true
    // const isTeacher = req.user.permissions.teacher === true    
    // if(isAdmin || isTeacher) {}
  
    // Create variation
    const variation = await Variation.create({
        name: req.body.name,
        createdBy: req.user.id
    })
    if (variation) {
        res.status(201).json({
            _id: variation.id,
            name: variation.name,
            createdBy: req.user.id
        })
    } else {
        res.status(400)
        throw new Error('Invalid technique data')
    }
})

// @desc    Get specific variation data
// @route   GET /api/techniques/variations/:id
// @access  Private
const getVariation = asyncHandler(async (req, res) => {
    const variation = await Variation.findById(req.params.id)

    if(!variation) {
        res.status(400)
        throw new Error('Variation not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check for user permission to GET variation data
    // Must be admin or teacher
    const isAdmin = req.user.permissions.admin
    const isTeacher = req.user.permissions.teacher

    if(isAdmin || isTeacher) {
        res.status(200).json(variation)
    } else {
        res.status(401)
        throw new Error('User not authorized')
    }
})

// @desc    Get all variations
// @route   GET /api/techniques/variations
// @access  Private
const getAllVariations = asyncHandler(async (req, res) => {
    const allVariations = await Variation.find({})

    // Check for user permission to GET technique data
    // Must be admin, teacher, or the user's technique
    const isAdmin = req.user.permissions.admin
    const isTeacher = req.user.permissions.teacher

    if(isAdmin || isTeacher) {
        res.status(200).json(allVariations)
    } else {
        res.status(401)
        throw new Error('User not authorized')
    }
})


module.exports = {
    saveVariation,
    getVariation,
    getAllVariations,
}