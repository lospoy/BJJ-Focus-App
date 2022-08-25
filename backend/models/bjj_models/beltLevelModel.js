const mongoose = require('mongoose')

const beltSchema = mongoose.Schema(
    {
        name: {
            type: Object,
            required: [true, 'Name required'],
            properties: {
                english: {
                    type: String,
                    required: false,
                },
                portuguese: {
                    type: String,
                    required: false,
                },
                japanese: {
                    type: Object,
                    required: false,
                    properties: {
                        kanji: {
                            type: String,
                            required: false,
                        },
                        hiraganaReading: {
                            type: String,
                            required: false,
                        },
                        romajiReading: {
                            type: String,
                            required: false,
                        },
                    }
                },

            },

        },
        stripes: {
            type: Object,
            required: false,
            properties: {
                oneStripe: {
                    type: Boolean,
                    required: false,
                },
                twoStripe: {
                    type: Boolean,
                    required: false,
                },
                threeStripe: {
                    type: Boolean,
                    required: false,
                },
                fourStripe: {
                    type: Boolean,
                    required: false,
                },
            }
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Belt', beltSchema)
