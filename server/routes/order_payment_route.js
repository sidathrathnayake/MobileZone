const express = require('express');
const router = express.Router();
const OrderPayment = require('../models/OrderPayment');
const rn = require('random-number');

/**Inserting Order and Payment Details */
router.post("/add", async(req,res) => {
    var gen = rn.generator({
        min:  0, 
        max:  999999,
        integer: true
    })
    const newOrder = new OrderPayment({
        orderId : 'ORD'+gen(),
        shippingId : req.body.shippingId,
        user : req.body.user,
        orderDate : new Date().toISOString(),
        totalItemValue : parseFloat(req.body.totalItemValue),
        shippingCharge : parseFloat(req.body.shippingCharge),
        taxCharge : parseFloat(req.body.taxCharge),
        totalCharge : parseFloat(req.body.totalCharge),
        paymentStatus : req.body.paymentStatus,
        deliveryStatus : 'Not Delivered'
    });
    await newOrder.save()
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
})

/**Retrieving All Order and Payment Details */
router.get("/view", async(req,res) => {
    await OrderPayment.find()
    .then(data => {
        res.status(200).send({ data: data });
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });
})

/**Retrieving Customer's Order and Payment Details */
router.get("/viewCustOrd/:user", async(req,res) => {
    if (req.params && req.params.user) {
        await OrderPayment.find({"user":req.params.user})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
})

/**Retrieving One Order and Payment Detail */
router.get("/viewOne/:orderId", async(req,res) => {
    if (req.params && req.params.orderId) {
        await OrderPayment.findOne({"orderId":req.params.orderId})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
})

/**Updating Order */
router.put("/update/:orderId", (req,res) => {
    OrderPayment.findOneAndUpdate({"orderId":req.params.orderId},{"deliveryStatus":req.body.deliveryStatus})
        .then(data => {
            res.status(200).send({data:data});            
        })
        .catch((error) =>{ 
            res.status(500).send({error:error.message});
        });

})

/**Deleting Order */
router.delete("/delete/:orderId", (req,res) => {
    OrderPayment.findOneAndDelete({"orderId":req.params.orderId})
        .then(data => {
            res.status(200).send({data:data});            
        })
        .catch((error) =>{ 
            res.status(500).send({error:error.message});
        });

})

/**Monthly Sales Amount*/
router.get("/report/:month/:year",(req,res) =>{
    var startDate = new Date(req.params.year+'-'+req.params.month+'-01');
    var endDate = new Date(req.params.year+'-'+req.params.month+'-31');

    OrderPayment.aggregate()
    .match({
        'orderDate':{$gte:startDate.toISOString(), $lte:endDate.toISOString()}
    })
    .group({
        _id: { month: req.params.month, year: req.params.year},
        totalAmount: {$sum: '$totalCharge'},
        count: {$sum: 1}
    })
    .then(data => {
        res.status(200).send({data:data});            
    })
    .catch((error) =>{ 
        res.status(500).send({error:error.message});
    });
})

/**Monthly Sales Order Details*/
router.get("/report2/:month/:year",(req,res) =>{
    var startDate = new Date(req.params.year+'-'+req.params.month+'-01');
    var endDate = new Date(req.params.year+'-'+req.params.month+'-31');

    OrderPayment.aggregate()
    .match({
        'orderDate':{$gte:startDate.toISOString(), $lte:endDate.toISOString()}
    })
    .then(data => {
        res.status(200).send({data:data});            
    })
    .catch((error) =>{ 
        res.status(500).send({error:error.message});
    });
})

module.exports = router;