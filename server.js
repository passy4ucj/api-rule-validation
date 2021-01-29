import express from 'express'
import dotenv  from 'dotenv'
import createErrors from 'http-errors'
import path from 'path'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import colors from 'colors'



//Load env vars
dotenv.config({ path: './config/config.env' })



//Route files
import validate from './routes/validateRoute.js'




const app = express()

// Body Parser
app.use(express.json())




// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


const profile = {
    name: "Pascal Ojinnaka",
    github: "@passy4ucj",
    email: "ojinnnakapascal@gmail.com",
    mobile: "08161718694",
    twitter: "@pascalojinnaka"
}

// Mount routers
app.get('/', (req, res) => {
    res.json({
        message: "My Rule-Validation API",
        status: "success",
        data: profile
    })
})
app.use('/validate-rule', validate)

//Use error Middleware
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000
app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))