const asyncHandler = require('express-async-handler')
const FocusLesson = require('../../models/bjj_models/focusLessonModel')


// @desc    Save new focusLesson
// @route   POST /api/focusLessons/create
// @access  Public
const saveFocusLesson = asyncHandler(async (req, res) => {
    const { 
        topic,
        content: { techniques }
    } = req.body

    if (!topic || !techniques) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    // Check if focusLesson exists
    const focusLessonExists = await FocusLesson.findOne({ topic, content: { techniques }})

    if (focusLessonExists) {
        res.status(400)
        throw new Error(`FocusLesson on ${topic} with those techniques already exists`)
    }

    // ************ TBD
    // Check for user permission to save focusLesson
    // Must be admin or techniques
    // const isAdmin = req.user.permissions.admin === true
    // const isTeacher = req.user.permissions.techniques === true    
    // if(isAdmin || isTeacher) {}
  
    // Create focusLesson
    const focusLesson = await FocusLesson.create({
        topic: req.body.topic,
        content: {
            techniques: req.body.content.techniques,
        },
        createdBy: req.user.id
    })
    if (focusLesson) {
        res.status(201).json({
            _id: focusLesson.id,
            topic: focusLesson.topic,
            content: {
                techniques: focusLesson.content.techniques._id,
            },
            createdBy: req.user.id
        })
    } else {
        res.status(400)
        throw new Error('Invalid focusLesson data')
    }
})

// @desc    Get specific focusLesson data
// @route   GET /api/focusLessons/:id
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
    // Must be admin, techniques, or the user's focusLesson
    const isAdmin = req.user.permissions.admin
    const isTeacher = req.user.permissions.techniques
    const studentIsUser = focusLesson.user ? focusLesson.user.toString() : ''
    const isTheStudentItself = studentIsUser === req.user.id

    if(isAdmin || isTeacher || isTheStudentItself) {
        res.status(200).json(focusLesson)
    } else {
        res.status(401)
        throw new Error('User not authorized')
    }
})

// @desc    Get all focusLessons
// @route   GET /api/focusLessons
// @access  Private
const getAllFocusLessons = asyncHandler(async (req, res) => {
    const allFocusLessons = await FocusLesson.find({})

    // Check for user permission to GET focusLesson data
    // Must be admin or techniques
    const isAdmin = req.user.permissions.admin
    const isTeacher = req.user.permissions.techniques

    if(isAdmin || isTeacher) {
        res.status(200).json(allFocusLessons)
    } else {
        res.status(401)
        throw new Error('User not authorized')
    }
})

// @desc    Update focusLesson data
// @route   PUT /api/focusLessons/:id
// @access  Private
const updateFocusLesson = asyncHandler(async (req, res) => {
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

    // Check for user permission to update focusLesson
    // Must be admin, techniques, or the user's focusLesson
    const isAdmin = req.user.permissions.admin === true
    const isTeacher = req.user.permissions.techniques === true
    const studentIsUser = focusLesson.user ? focusLesson.user.toString() : ''
    const isTheStudentItself = studentIsUser === req.user.id
    

    if( isAdmin || isTeacher || isTheStudentItself ) {
            const updatedFocusLesson = await FocusLesson.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
            res.status(200).json(updatedFocusLesson)
    } else {
        res.status(401)
        throw new Error('User not authorized')
    }

    // **************LATEST ACTION 22:45 08/30: UPDATE HUMAN
    // update doesnt add to the property of the object, it replaces the property of the object
    // expected is it ADDS to the property, not replace
    // unsure if this needs to be done client side
})


module.exports = {
    saveFocusLesson,
    getFocusLesson,
    getAllFocusLessons,
    updateFocusLesson,
}