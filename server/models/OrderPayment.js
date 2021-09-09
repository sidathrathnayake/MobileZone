const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderDetailSchema = new schema({
    
    orderId:{
        type: String,
        required: true,
        unique:true
    },
    shippingId:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    orderDate:{
        type: String,
        required: true
    },
    totalItemValue:{
        type: Number,
        required: true
    },
    shippingCharge:{
        type: Number,
        required: true
    },
    taxCharge:{
        type: Number,
        required: true
    },
    totalCharge:{
        type: Number,
        required: true
    },
    paymentStatus:{
        type: String,
        required: true
    },
    deliveryStatus:{
        type: String,
        required: true
    }
})

const OrderPayment = mongoose.model("orderPayment",orderDetailSchema);

module.exports = OrderPayment;