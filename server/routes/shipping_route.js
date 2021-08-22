const express = require('express');
const router = express.Router();
const Shipping = require('../models/Shipping');
const rn = require('random-number');

/**Inserting Shipping Details */
router.post("/add", async(req,res) => {
    var gen = rn.generator({
        min:  0, 
        max:  999999,
        integer: true
    })
    const newShipDet = new Shipping({
        shippingId : 'SHP'+gen(),
        fullName : req.body.fullName,
        address : req.body.address,
        postalCode : req.body.postalCode,
        country : req.body.country
    });
    
    await newShipDet.save()
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
})

/**Retrieving All Shipping Details */
router.get("/view", async(req,res) => {
    await Shipping.find()
    .then(data => {
        res.status(200).send({ data: data });
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });
})

/**Retrieving One Shipping Detail */
router.get("/viewOne/:shippingId", async(req,res) => {
    if (req.params && req.params.shippingId) {
        await Shipping.findOne({"shippingId":req.params.shippingId})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    }
})

module.exports = router;