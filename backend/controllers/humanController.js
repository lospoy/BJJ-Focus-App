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
    const human = await Human.find(req.human)

    if(!human) {
        res.status(400)
        throw new Error('Human not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check for user permission to SEE human
    // Must be admin, teacher, or the user's human
    if(req.user.permissions.admin === true
        || req.user.permissions.teacher === true
        || human.user.toString() === req.user.id) {
            res.status(200).json(human)
    } else {
        res.status(401)
        throw new Error('User not authorized')
    }
})

// @desc    Update human data
// @route   PUT /api/humans/:id
// @access  Private
const updateHuman = asyncHandler(async (req, res) => {
    const human = await Human.findById(req.params.id)

    if(!human) {
        res.status(400)
        throw new Error('Human not found')
    }
    
    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check for user permission to modify human (admin / teacher)
    const isAdmin = req.user.permissions.admin === true
    const isTeacher = req.user.permissions.teacher === true
    const isTheStudentItself = human.user.toString() === req.user.id

    if( isAdmin || isTeacher || isTheStudentItself ) {
        const updatedHuman = await Human.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.status(200).json(updatedHuman)

    } else {
        res.status(401)
        throw new Error('User not authorized')
    }

    // **************LATEST ACTION 16:00 08/26: POST UPDATE HUMAN DATA
    // "message": "Cannot read properties of undefined (reading 'toString')",
    // "stack": "TypeError: Cannot read properties of undefined (reading 'toString')\n   
    // at E:\\WebDev\\Portfolio\\BJJ-app\\backend\\controllers\\humanController.js:98:43\n
    // at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
})


module.exports = {
    registerHuman,
    getHuman,
    updateHuman,
}