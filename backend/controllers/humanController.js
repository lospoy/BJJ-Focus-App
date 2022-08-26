const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Human = require('../models/humanModel')

// @desc    Register new human
// @route   POST /api/humans
// @access  Public
const registerHuman = asyncHandler(async (req, res) => {
    // trainingStatus active by default for new humans
    const { 
        name: { first, last },
        trainingStatus,
        trainingHistory: { belt },
    } = req.body

    if (!first || !last || !trainingStatus || !belt) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    // Check if human exists
    const humanExists = await Human.findOne({ name: { first, last } })

    if (humanExists) {
        res.status(400)
        throw new Error(`Human with name ${last, first} already exists`)
    }

    // Create human
    const human = await Human.create({
        name: {first, last},
        trainingStatus,
        trainingHistory: { belt },
    })

    if (human) {
        res.status(201).json({
            _id: human.id,
            first: human.name.first,
            last: human.name.last,
            trainingStatus: human.trainingStatus,
            belt: human.trainingHistory.belt
        })
    } else {
        res.status(400)
        throw new Error('Invalid human data')
    }
})

// @desc    Get human data
// @route   GET /api/humans/:id
// @access  Private
const getHuman = asyncHandler(async (req, res) => {
    res.status(200).json(req.params.id)
})

// @desc    Update human data
// @route   PUT /api/humans/:id
// @access  Private
const updateHuman = asyncHandler(async (req, res) => {
    const human = await Human.findById(req.params.id)

    // Check for human
    if(!human) {
        res.status(401)
        throw new Error('Human not found')
    }

    const updatedHuman = await Human.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedHuman)
})


module.exports = {
    registerHuman,
    getHuman,
    updateHuman,
}