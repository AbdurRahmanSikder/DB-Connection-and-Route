const express = require('express');
const router = express.Router();
const menu = require('./../models/menu');

router.post('/', async (req,res) => {
    try{
        const data = req.body;
        const newMenu = new menu(data);
        const response = await newMenu.save();
        console.log('Menu Save');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal error'})
    }
})

router.get('/', async (req,res) => {
    try{
        const response = await menu.find();
        console.log('data fetched');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal error'})
    }
})

router.put('/:id', async (req,res) => {
    try{
        const menuID = req.params.id;
        const menuBody = req.body;
        const response = await menu.findByIdAndUpdate(menuID,menuBody,{
            new: true,
            runValidators: true, 
        });
        if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        console.log('data Edited');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal error'})
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const menuID = req.params.id;
        const response = await menu.findByIdAndDelete(menuID);
        if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        console.log('data Deleted');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal error'})
    }
})

module.exports = router;