// here we define the user SCHEMA
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: Object,
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
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        human: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Human',
        },
        appMetrics: {
            type: [appMetricSchema],
            required: true,
            ref: 'AppMetric',
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
