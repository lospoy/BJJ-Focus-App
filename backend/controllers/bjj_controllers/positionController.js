const asyncHandler = require('express-async-handler')
const Position = require('../models/positionModel')
const User = require('../models/app_models/userModel')

// @desc    Save new position
// @route   POST /api/techniques/positions
// @access  Public
const savePosition = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    // Check if position exists
    const positionExists = await Technique.findOne({ name: name })

    if (positionExists) {
        res.status(400)
        throw new Error(`Technique dated ${date} already exists`)
    }

    // ************ TBD
    // Check for user permission to save position
    // Must be admin or teacher
    // const isAdmin = req.user.permissions.admin === true
    // const isTeacher = req.user.permissions.teacher === true    
    // if(isAdmin || isTeacher) {}
  
    // Create position
    const position = await Position.create({
        name: req.body.name,
        createdBy: req.user.id
    })
    if (position) {
        res.status(201).json({
            _id: position.id,
            name: position.name,
            createdBy: req.user.id
        })
    } else {
        res.status(400)
        throw new Error('Invalid technique data')
    }
})

// @desc    Get specific position data
// @route   GET /api/techniques/positions/:id
// @access  Private
const getPosition = asyncHandler(async (req, res) => {
    const position = await Position.findById(req.params.id)

    if(!position) {
        res.status(400)
        throw new Error('Position not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check for user permission to GET position data
    // Must be admin or teacher
    const isAdmin = req.user.permissions.admin
    const isTeacher = req.user.permissions.teacher

    if(isAdmin || isTeacher) {
        res.status(200).json(position)
    } else {
        res.status(401)
        throw new Error('User not authorized')
    }
})

// @desc    Get all positions
// @route   GET /api/techniques/positions
// @access  Private
const getAllPositions = asyncHandler(async (req, res) => {
    const allPositions = await Position.find({})

    // Check for user permission to GET technique data
    // Must be admin, teacher, or the user's technique
    const isAdmin = req.user.permissions.admin
    const isTeacher = req.user.permissions.teacher

    if(isAdmin || isTeacher) {
        res.status(200).json(allPositions)
    } else {
        res.status(401)
        throw new Error('User not authorized')
    }
})


module.exports = {
    savePosition,
    getPosition,
    getAllPositions,
}