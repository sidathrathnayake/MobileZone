const mongoose = require('mongoose');
const schema = mongoose.Schema;

const shippingDetailSchema = new schema({
    
    shippingId:{
        type: String,
        required: true,
        unique:true
    },
    fullName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    postalCode:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    }
})

const Shipping = mongoose.model("shippingDetail",shippingDetailSchema);

module.exports = Shipping;