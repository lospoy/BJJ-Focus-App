// here we define the user SCHEMA
const mongoose = require('mongoose')

const humanSchema = mongoose.Schema(
    {
        name: {
            type: Object,
            required: [true, 'Name required'],
            properties: {
                firstName: {
                    type: String,
                    required: [true, 'First name required'],
                },
                lastName: {
                    type: String,
                    required: [true, 'Last name required'],
                },
                nickName: {
                    type: String,
                    required: false
                },
                pronouns: {
                    type: String,
                    required: false
                },
            }
        },
        trainingStatus: {
            type: Object,
            required: [true, 'Current training status required.'],
            properties: {
                active: {
                    type: Boolean,
                    required: false,
                },
                injured: {
                    type: Boolean,
                    required: false,
                },
                resting: {
                    type: Boolean,
                    required: false,
                },
                unknown: {
                    type: Boolean,
                    required: false,
                },
                retired: {
                    type: Boolean,
                    required: false,
                },
        },
        trainingHistory: {
            type: Object,
            required: [true, 'Specify training history. At least "brand new".' ],
            properties: {
                belt: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: [true, 'Belt level required.'],
                    ref: 'Belt'
                },
                lastSession: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: [true, 'Last session required.'],
                    ref: 'Session'
                },
                firstSession: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: [true, 'First session required.'],
                    ref: 'Session'
                },
                totalTrained: {
                    type: Object,
                    required: [true, 'Specify total trained. Minimum 1 class.'],
                    properties: {
                        totalNumberOfSessions: {
                            type: Number,
                            required: [true, 'Total number of sessions required.'],
                        },
                        totalTimeTrained: {
                            type: Number,
                            required: [true, 'Total minutes trained required.'],
                        }
                    }
                }
            }
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Human', humanSchema)
