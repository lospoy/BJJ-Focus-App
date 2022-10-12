const asyncHandler = require('express-async-handler')
const FocusLesson = require('../../models/bjj_models/focusLessonModel')

// @desc    Save new focusLesson
// @route   POST /api/techniques/focusLessons
// @access  Public
const saveFocusLesson = asyncHandler(async (req, res) => {
    const { topic, techniquesArray } = req.body

    if (!topic || !techniquesArray) {
        res.status(400)
        throw new Error('Please fill topic and techniques')
    }

    // Check if focusLesson exists
    const focusLessonExists = await FocusLesson.findOne({ topic: topic, techniquesArray: techniquesArray })

    if (focusLessonExists) {
        res.status(400)
        throw new Error(`FocusLesson with topic ${topic} and techniques  ${techniquesArray} already exists`)
    }

    // ************ TBD
    // Check for user permission to save focusLesson
    // Must be admin or teacher
    // const isAdmin = req.user.permissions.admin === true
    // const isTeacher = req.user.permissions.teacher === true    
    // if(isAdmin || isTeacher) {}
  
    // Create focusLesson
    const focusLesson = await FocusLesson.create({
        topic: req.body.topic,
        techniquesArray: req.body.techniquesArray,
        createdBy: req.user.id
    })
    if (focusLesson) {
        res.status(201).json({
            _id: focusLesson.id,
            topic: focusLesson.topic,
            techniquesArray: focusLesson.techniquesArray,
            createdBy: req.user.id
        })
    } else {
        res.status(400)
        throw new Error('Invalid technique data')
    }
})

// @desc    Get specific focusLesson data
// @route   GET /api/techniques/focusLessons/:id
// @access  Private
const getFocusLesson = asyncHandler(async (req, res) => {
    const focusLesson = await FocusLesson.findById(req.params.id)

    if(!focusLesson) {
        res.status(400)
        throw new Error('FocusLesson not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check for user permission to GET focusLesson data
    // Must be admin or teacher
    const isAdmin = req.user.permissions.admin
    const isTeacher = req.user.permissions.teacher

    if(isAdmin || isTeacher) {
        res.status(200).json(focusLesson)
    } else {
        res.status(401)
        throw new Error('User not authorized')
    }
})

// @desc    Get all focusLessons
// @route   GET /api/techniques/focusLessons
// @access  Private
const getAllFocusLessons = asyncHandler(async (req, res) => {
    const allFocusLessons = await FocusLesson.find({})

    // Check for user permission to GET technique data
    // Must be admin, teacher, or the user's technique
    const isAdmin = req.user.permissions.admin
    const isTeacher = req.user.permissions.teacher

    if(isAdmin || isTeacher) {
        res.status(200).json(allFocusLessons)
    } else {
        res.status(401)
        throw new Error('User not authorized')
    }
})

module.exports = {
    saveFocusLesson,
    getFocusLesson,
    getAllFocusLessons,
}