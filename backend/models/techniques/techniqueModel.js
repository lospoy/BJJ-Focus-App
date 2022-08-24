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
            required: true,
            ref: 'Variation'
        },
        curriculum: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Curriculum'
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Technique', techniqueSchema)
