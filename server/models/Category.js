/*Importing mongoose*/
const mongoose = require('mongoose');

/*Importing schema package in mongoose*/
const Schema = mongoose.Schema;

/**Creating a category class with attributes*/
const category = new Schema ({
    categoryName : {
        type: String,
        required : true,
    },
    categoryDescription : {
        type: String,
        required : true,
    },
    /**Adding the image code */
    categoryImage : {
        type: String,
        required: true,
    }
})

/**Creating a table in the database(model('category', category which was initialized above))*/
const categoryX = mongoose.model("category", category);

/**Exporting the AdminPay table */
module.exports = categoryX;