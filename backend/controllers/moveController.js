const asyncHandler = require('express-async-handler')
const Move = require('../models/moveModel')

// @desc    Get specific move data
// @route   GET /api/techniques/moves/:id
// @access  Private
const getMove = asyncHandler(async (req, res) => {
    const move = await Move.findById(req.params.id)

    if(!move) {
        res.status(400)
        throw new Error('Move not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check for user permission to GET move data
    // Must be admin or teacher
    const isAdmin = req.user.permissions.admin
    const isTeacher = req.user.permissions.teacher

    if(isAdmin || isTeacher) {
        res.status(200).json(move)
    } else {
        res.status(401)
        throw new Error('User not authorized')
    }
})

// @desc    Get all moves
// @route   GET /api/techniques/moves
// @access  Private
const getAllMoves = asyncHandler(async (req, res) => {
    const allMoves = await Move.find({})

    // Check for user permission to GET technique data
    // Must be admin, teacher, or the user's technique
    const isAdmin = req.user.permissions.admin
    const isTeacher = req.user.permissions.teacher

    if(isAdmin || isTeacher) {
        res.status(200).json(allMoves)
    } else {
        res.status(401)
        throw new Error('User not authorized')
    }
})

// ******************************************************************
// ******************************************************************
//                      VARIATION Controllers
// ******************************************************************
// ******************************************************************


module.exports = {
    getMove,
    getAllMoves,
}