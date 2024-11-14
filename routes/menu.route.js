import express from 'express'
import {MenuItem} from '../models/menu.model.js'

const menuRouter = express.Router()

menuRouter.post('/', async (req, res)=>{
    try {
        const data = req.body
        const newMenu = new MenuItem(data)
        const response = await newMenu.save()
        console.log("Data for menu is saved!!");
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Somethong went wrong!!"})
    }
})

menuRouter.get('/', async (req, res)=>{
    try {
        const data = await MenuItem.find()
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Somethong went wrong in menu!!"})
    }
})

menuRouter.get('/:taste', async (req, res)=>{
    try {
        const tasteType = req.params.taste
        if(tasteType==="spicy" || tasteType==="sour" || tasteType==="sweet"){
            const response = await MenuItem.find({taste: tasteType})
            res.status(200).json(response)
        } else{
            res.status(404).json({error: "Invalid taste type"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Ineternal server error"})
    }
})

menuRouter.put('/:id', async (req, res)=>{
    try {
        const menuId = req.params.id
        const data = req.body
        const response = await MenuItem.findByIdAndUpdate(menuId, data, {
            new: true,
            runValidators: true
        })
        if(!response){
            res.status(404).json({error: "Item not found"})
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Ineternal server error"})
    }
})

menuRouter.delete('/:id', async (req, res)=>{
    try {
        const menuId = req.params.id
        const response = await MenuItem.findByIdAndDelete(menuId)
        if(!response){
            res.status(404).json({error: "Item not found"})
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error: "Internal server error"})
    }
})


export default menuRouter
