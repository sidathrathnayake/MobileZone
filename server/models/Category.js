const mongoos = require('mongoose');

const CategorySchema = new mongoos.Schema({
    categoryName:{
        type:String,
        required:true
    },
    countInStock:{
        type:Number,
        required:true
    }
})

const Categories = mongoos.model('Categories',CategorySchema);
module.exports = Categories;