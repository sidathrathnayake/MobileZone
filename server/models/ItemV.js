const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const item = new Schema ({
    itemName : {
        type : String,
        required: true
    },
    itemPrice : {
        type : Number,
        required : true
    },
    categoryName : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    itemImage : {
        type : String,
        required : true
    },
    countInStock : {
        type : Number,
        required : true
    }

})

const itemX = mongoose.model("itemv", item);
module.exports = itemX;