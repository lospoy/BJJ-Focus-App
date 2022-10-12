const mongoose = require('mongoose')

const focusLessonSchema = mongoose.Schema(
    {
        topic: {
            type: String,
            required: [true, 'Topic required.'],
        },
        techniques: {
            type: mongoose.Schema.Types.ObjectId,
            required: [false, 'Techniques required.'],
            ref: 'Technique',
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('FocusLesson', focusLessonSchema)
