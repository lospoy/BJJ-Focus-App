const mongoose = require('mongoose')

const focusLessonSchema = mongoose.Schema(
    {
        number: {
            type: Number,
            required: [true, 'Number required.'],
        },
        title: {
            type: String,
            required: [true, 'Title required.'],
        },
        techniques: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Techniques required.'],
            ref: 'Technique',
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('FocusLesson', focusLessonSchema)
