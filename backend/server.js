const path = require('path')
const cors = require('cors')
const express = require('express')
// **colors AND dotenv required to start server**
// **even if the IDE marks it as "not in use"**
const colors = require('colors')
const dotenv = require('dotenv').config()
// **
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 8000
const { apiRedirect } = require("./middleware/apiFallbackMiddleware")


connectDB()

const app = express()

// #c301 >> this is the middleware
// @route   /controllers/priceController 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(apiRedirect)

app.use('/api/appMetrics', require('./routes/app_routes/appMetricRoutes'))
app.use('/api/users', require('./routes/app_routes/userRoutes'))
app.use('/api/humans', require('./routes/humanRoutes'))
app.use('/api/sessions', require('./routes/sessionRoutes'))
app.use('/api/techniques', require('./routes/bjj_routes/techniqueRoutes'))
app.use('/api/techniques/positions', require('./routes/bjj_routes/positionRoutes'))
app.use('/api/techniques/moves', require('./routes/bjj_routes/moveRoutes'))
app.use('/api/techniques/variations', require('./routes/bjj_routes/variationRoutes'))
app.use('/api/focusLessons', require('./routes/bjj_routes/focusLessonRoutes'))

// Serve frontend >> *must* be under the API routes
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
            )
        }
    )
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

// middleware that overwrites the default express error handler
// @route   /middleware/errorMiddleware
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))