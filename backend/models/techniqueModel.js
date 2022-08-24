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
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Technique', techniqueSchema)
