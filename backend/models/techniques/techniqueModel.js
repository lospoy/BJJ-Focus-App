const mongoose = require('mongoose')

const techniqueSchema = mongoose.Schema(
    {
        position: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Position'
        },
        move: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Move'
        },
        variation: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Specify variation, at least "standard".'],
            ref: 'Variation'
        },
        curriculum: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Curriculum'
        },
        times_taught: {
            type: Number,
            required: [true, 'Times taught is at least zero.']
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Technique', techniqueSchema)
