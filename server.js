import express from 'express'
import {db} from './db.js'
import {Person} from './models/user.model.js'
import bodyParser from 'body-parser'
import { MenuItem } from './models/menu.model.js'
import personRoutes from './routes/person.route.js'
import menuRouter from './routes/menu.route.js'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send("Hello How are you?")
})


app.use('/person', personRoutes)
app.use('/menu', menuRouter)

// comment for testing purpose

app.listen(port, ()=>{
    console.log("Listening on port 3000...");
})

