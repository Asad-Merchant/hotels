import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// const mongoURI = process.env.MONGO_URL_LOCAL 
const mongoURI = process.env.MONGO_URL 

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('connected', ()=>{
    console.log("Connected successfully");
})

db.on('error', (err)=>{
    console.log("Some error occured", err);
})

db.on('disconnected', ()=>{
    console.log("DB disconnected");
})


export {db}