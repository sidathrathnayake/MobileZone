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
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Categories'
    },
    description:{
        type:String,
        required:false
    },

})

const ItemModel = mongoose.model("Items",ItemSchema);
module.exports = ItemModel