const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Category = require('../models/Category');
const {upload} = require('../utils/image_Upload_Helper');

/** Inserting an item */
router.post('/admin/add-item',upload.single('file'),async (req, res) =>{

    const item = {
        itemName:req.body.itemName,
        itemPrice:req.body.itemPrice,
        itemCategory:req.body.itemCategory,
        itemDescription:req.body.itemDescription,
        imageName:req.file.filename,
        imageUrl:req.file.path,
        countInStock:req.body.countInStock
    };
    console.log(item);
    try{
        const newItem = new Item(item);
        await newItem.save()
            .then(data=>{
                res.status(200).send({data:data})
            });
    }catch (err) {
        console.log(err);
        res.status(500).send({
            success:false,
            error:err.message
        })
    }
});

/** Get all Items */
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

/** Search items */
router.post('/search-items',async (req, res)=>{

    try{
        await Item.find({itemName:{$regex:req.body.keyWord,$options:'i'}})
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

/** Get all categories */
router.get('/get-category', async (req, res) =>{
    try{
        await Category.find()
            .then(data =>{
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

/** Add Category */
router.post('/add-cat',async (req, res) =>{
    const cat = {
        categoryName:req.body.categoryName,
        countInStock:req.body.countInStock
    }

    try{
        const newCat = new Category(cat);
        await newCat.save()
            .then(data=>{
                res.status(200).send({
                    data:data
                })
            })
    }catch (err){
        res.status(500).send({
            success:false,
            error:err.message
        })
    }
})

router.get('/get-item-By-category/:id',async (req, res)=>{
    try{
        await Item.find({itemCategory:req.params.id})
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

router.get('/get-item-by-id/:id',async(req,res) => {
    try{
        await Item.findById(req.params.id)
        .then(data => {
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

// router.put('/update-item-quantity',async(req,res) => {
//     console.log(req.body._id)
//     console.log(req.body.countInStock)
//     try{
//         await Item.findByIdAndUpdate(req.body._id,{countInStock: req.body.countInStock})
//         .then(res=>{
//             res.status(200).send({
//                 data:res
//             })
//         })
//     }
//     catch (error) {
//         res.status(500).send({
//             success:false,
//             error:error.message
//         })
//     }
// })
module.exports = router;