const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    itemPrice:{
        type:Number,
        required:true
    },
    itemCategory:{
        type:String,
        required:true
    },
    itemDescription:{
        type:String,
        required:false
    },
    imageName:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    countInStock: {
        type:Number,
        required:true
    }

})

const ItemModel = mongoose.model("Items",ItemSchema);
module.exports = ItemModel