const mongoose = require('mongoose')
// here we define the SCHEMA for the BJJ classes or "sessions" (to avoid using typical programming words)
// sessions are unlimited, it's every instance that a teacher holds a BJJ class
//
// A session's properties >>
//
// date: day session was held
// scheduleSlot: pre-decided time (e.g. 10:00AM)
// teacher: 1
// students: 1 to 50
// sessionType: focus, allLevels, advanced
// topics: 1 to 3
// techniques: 1 to 10
// duration: 30min to 180min
// warmup: yes/no, duration

const sessionSchema = mongoose.Schema(
    {
        // date the session was held
        date_held: {
            type: Date,
            required: [true, 'Date required.'],
        },
        // pre-decided time (e.g. 10:00AM)
        scheduleSlot: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Schedule'
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Teacher required.'],
            ref: 'Teacher'
        },
        students: {
            type: [studentSchema],
            required: [true, 'Students required.'],
            ref: 'Student'
        },
        // type of session: focus, allLevels, advanced, etc.
        sessionType: {
            type: Object,
            required: true,
            properties: {
                name: {
                    type: String,
                    required: [true, 'The session surely has a name (beginners?).']
                },
                gi_nogi: {
                    type: Object,
                    required: [true, 'Gi or Nogi?.'],
                    properties: {
                        gi: {
                            type: Boolean,
                            required: false,
                        },
                        nogi: {
                            type: Boolean,
                            required: false,
                        }
                    }
                },
            }
        },
        // is duration a number?? talking about minutes here
        duration: {
            type: Number,
            required: [true, 'Duration of session required.'],
        },
        // array of techniques/moves that were taught in the session
        techniques: {
            type: [techniqueSchema],
            ref: 'Technique',
            required: [true, 'Techniques required.'],
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Session', sessionSchema)