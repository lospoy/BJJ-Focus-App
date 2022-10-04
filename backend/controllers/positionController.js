const asyncHandler = require('express-async-handler')
const Position = require('../models/positionModel')
const Move = require('../models/moveModel')
const User = require('../models/app_models/userModel')

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
    getPosition,
    getAllPositions,
}