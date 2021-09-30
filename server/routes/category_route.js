/*importing roter package in express */
const router = require("express").Router();
const { response } = require("express");
/*importing model class  */
const Category = require("../models/Category");

const OrderPayment = require("../models/OrderPayment");

const Error = require('../utils/error_response');

const moment = require('moment');
/**Importing Multer */
const multer = require("multer");

// E:\GitHUB\Github-Projects\MobileZone\client\public\uploads\galaxy_s21_5g_highlights_box.0.jpg
// ../../client/public/uploads/


/**Initializing disk storage */
const storage = multer.diskStorage({
    destination : (req,file, callback) => {
        callback(null, "C:/Users/msi gf63/Desktop/MobileZone/client/public/uploads/");
    },
    filename : (req,file, callback) => {
        callback(null, file.originalname);
    }
})
/**Defining the Image type */
const fileFilter = (req,file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
/**Initializing the file size  */
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/**Insertion method for inserting a category */
router.post("/insert", upload.single("categoryImage"), (req,res) => {
    const newCat = new Category({
        categoryName : req.body.categoryName,
        categoryDescription : req.body.categoryDescription,
        categoryImage : req.file.originalname
    });
    newCat
        .save()
        .then(() => res.json("New Category Added!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})
/**Updating method for updating a catageory */
router.put("/update/:categoryName", upload.single("categoryImage"), (req,res) => {
    Category.findOne({"categoryName":req.params.categoryName})
        .then((cat) => {
            cat.categoryName = req.body.categoryName;
            cat.categoryDescription = req.body.categoryDescription;
            cat.categoryImage = req.file.originalname;

            cat
            .save()
            .then(() => res.json("Category Updated!"))
            .catch((err) => res.status(400).json(`Error: ${err}`));
        })
        .catch((err) => res.status(400).json(`Error: ${err}`));

})
/*Retrieving method for retrieving all category */ 
router.route("/retrieve").get((req,res) => {
    Category.find().then((category) => {
        res.json(category)
    }).catch((err) => {
        console.log(err);
    })
})
/**Retrieving method for retrieving a single category using the ID*/
router.route("/retrieve/:id").get(async (req,res) => {
    let categoryID = req.params.id;
    /**Retrieving a specific record using findById method */
    const category = await Category.findById(categoryID)
    .then((cat) => {
        res.status(200).send({status: "Category Fetched", cat});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting the category", error: err.message});
    })
})
/**Retrieving method for retrieving a single category using the Category Name*/
router.route("/retrieveOne/:categoryName").get(async (req,res) => {
    let categoryName = req.params.categoryName;

    await Category.findOne({"categoryName":categoryName}).then((getOne)=>{
        res.json(getOne);
    }).catch((err)=>{
        console.log(err);
    })
})

/**Deleting method for deleting a category using the ID*/
router.route("/delete/:id").delete(async (req,res) => {
    let categoryID = req.params.id;
    /**Retrieving a specific record and deleting it using findById method */
    await Category.findByIdAndDelete(categoryID)
    .then(() => {
        res.status(200).send({status: "Category Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
    })
})
/**Deleting method for deleting a category using the Category Name*/
router.route("/deleteOne/:categoryName").delete(async (req,res) => {
    //const path1  = req.params.path+"/"+req.params.file;
    let categoryName = req.params.categoryName;
    await Category.findOneAndDelete({"categoryName":categoryName})
    .then(()=>{
        res.json("Category Deleted");
    }).catch((err)=>{
        console.log(err);
    });
})


/**Retrieving method for retrieving a single category using the ID*/
// router.route("/retrieve/:id").get(async (req,res) => {
//     let categoryID = req.params.id;
//     /**Retrieving a specific record using findById method */
//     const category = await Category.findById(categoryID)
//     .then((cat) => {
//         res.status(200).send({status: "Category Fetched", cat});
//     }).catch((err) => {
//         console.log(err.message);
//         res.status(500).send({status: "Error with getting the category", error: err.message});
//     })
// })
router.route("/weeklyreport/:dDate").get(async (req,res) => {
    let orderDate = req.params.orderDate.getFullYear();
    let dDate = orderDate.getFullYear();
    // let lastDate = req.params.orderDate;

    const order_payment = await OrderPayment.find({"dDate":dDate})
    .then((orderPay) => {
        res.status(200).send({status:"Weekly Report Fetched", orderPay});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with getting the weekly report", error: err.message});
    })
})

// router.get('/get-orders-weekly-customer/:startDate/:endDate',async(req, res) => {
//     try{
//         await OrderPayment.find({orderDate:{$gte: req.params.startDate,$lte: req.params.endDate}}).then(data => {
//             res.status(200).send({
//                 data:data,
//                 success:true
//             })
//         })
//     }catch(error){
//         res.status(500).send({
//             success:false,
//             message:"Server error"
//         })
//     }
// });

router.get('/get-orders-weekly-customer', (req,res,next) => {
  
    let today,weekago;

    today = moment().format("YYYY-MM-DD");
    weekago = moment().subtract(7,'d').format('YYYY-MM-DD');

  
    OrderPayment.find({
        "orderDate": {
          $gte: weekago,
          $lte: today
        }
      },(err, cus_orders) => {

        if(err){
            return next(new Error('No New Customer Orders!', 400));
        }
        return res.status(200).json({
            success:true,
            cus_orders
        });
    });
});

/*exporting adding route*/
module.exports = router;