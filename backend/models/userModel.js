// here we define the user SCHEMA
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: Object,
            required: [true, 'Name required.'],
            properties: {
                first: {
                    type: String,
                    required: [true, 'First name required'],
                },
                last: {
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
        permissions: {
            type: Object,
            required: false,
            properties: {
                admin: {
                    type: Boolean,
                    required: false
                },
            }
        },
        human: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Human',
        },
        appMetrics: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'AppMetric',
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
