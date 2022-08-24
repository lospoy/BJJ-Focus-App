const mongoose = require('mongoose')

const curriculumSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name required.'],
        },
        techniques: {
            type: [techniqueSchema],
            ref: 'Technique',
            required: [true, 'Techniques required.'],
        },
        levels: {
            type: Object,
            required: [true, 'Level required.'],
            properties: {
                allLevels: {
                    type: Boolean,
                    required: false
                },
                specificLevels: {
                    type: [beltLevelSchema],
                    ref: 'BeltLevel',
                    required: false,
                }
            }
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Curriculum', curriculumSchema)
