const mongoose = require('mongoose')

const focusLessonSchema = mongoose.Schema(
    {
        number: {
            type: Number,
            required: [false, 'Number required.'],
        },
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
