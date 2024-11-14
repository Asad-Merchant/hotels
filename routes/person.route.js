import express from 'express'
import { Person } from '../models/user.model.js'

const personRouter = express.Router()

personRouter.post('/', async (req, res)=>{
    try {
        const data = req.body
        const newPerson = new Person(data)
        const response =  await newPerson.save()
        console.log("Data for person is saved!!");
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Something went wrong"})       
    }
})

personRouter.get('/', async (req, res)=>{
    try {
        const data = await Person.find()
        console.log("Data fetched!!");
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Something went wrong"})   
    }
})

personRouter.get('/:work', async (req, res)=>{
    try {
        const workType = req.params.work
        if(workType==="chef" || workType==="waiter" || workType==="manager"){
            const response = await Person.find({work: workType})
            res.status(200).json(response)
        }else{
            res.status(404).json({error: "Work type invalid"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Something went wrong"})
    }
})

personRouter.put('/:id', async (req, res)=>{
    try {
        const personId = req.params.id
        const updatedPersonData = req.body

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        })
        if(!response){
            res.status(404).json({error: "Person not found"})
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Something went wrong"})
    }
})

personRouter.delete('/:id', async (req, res)=>{
    try {
        const personId = req.params.id
        const response = await Person.findByIdAndDelete(personId)
        if(!response){
            res.status(404).json({error: "Person not found"})
        }
        res.status(200).json({message: "Person deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Something went wrong"})
    }
})


export default personRouter
