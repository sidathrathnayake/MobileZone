const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

//Inserting an item
router.post('/admin/add-item',async (req, res) =>{
    const item = new Item(req.body);
    try{
        await item.save()
            .then(data=>{
                res.status(200).send({data:data})
            });
    }catch (err) {
        res.status(500).send({
            success:false,
            error:err.message
        })
    }
});

//Get all Items
router.get('/get-items',async (req, res)=>{
    try{
        await Item.find()
            .then(data=>{
                res.status(200).send({
                    data:data
                })
            })
    }catch (error) {
        res.status(500).send({
            success:false,
            error:error.message
        })
    }
})

//Search items
router.get('/search-items/:name',async (req, res)=>{

    try{
        await Item.find({itemName:{$regex:req.params.name,$options:'i'}})
            .then(data=>{
                res.status(200).send({
                    data:data
                })
            });
    }catch (error) {
        res.status(500).send({
            success:false,
            error:error.message
        })
    }
})

module.exports = router;