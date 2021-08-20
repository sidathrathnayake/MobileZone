const router = require("express").Router();
const { response } = require("express");

const Item = require('../models/ItemV');

const multer = require("multer");

/**Initializing disk storage */
const storage = multer.diskStorage({
    destination : (req,file, callback) => {
        callback(null, "E:/GitHUB/Github-Projects/MobileZone/client/public/uploads/");
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

  router.post("/insert", upload.single("itemImage"),(req,res) => {
      const item = new Item ({
            itemName : req.body.itemName,
            itemPrice : Number(req.body.itemPrice),
            categoryName : req.body.categoryName,
            description : req.body.description,
            itemImage : req.file.originalname,
            countInStock : Number(req.body.countInStock)
      })
      item.save()
      .then(() => {
          res.status(200).json("itemV added successfully")
      })
      .catch((err) => {
          res.status(400).json("Faliure" + err)
      })
  })

  router.route("/").get(async(req,res) => {
      Item.find()
      .then((item) => {
          res.status(200).json(item)
      })
      .catch((err) => {
          res.status(400).json("failure" + err)
      })
  })

  router.route("/:id").get(async(req,res) => {
      let itemID = req.params.id

      const itemv = await Item.findById(itemID)
      .then((itemv) => {
          res.status(200).send({status : "Item Found", itemv})
      })
      .catch((err) => {
          res.status(400).send({status : "Fail" , error:err.message})
      })
  })
    router.route("/category/:categoryName").get(async(req,res) => {
        let categoryName = req.params.categoryName
        Item.find({"categoryName" : categoryName})
        .then((item) => {
            res.status(200).json(item)
        })
        .catch((err) => {
            res.status(400).json("failure" + err)
        })
    })

    /**Deleting method for deleting a category using the ID*/
    router.route("/delete/:id").delete(async (req,res) => {
        let itemID = req.params.id;
        /**Retrieving a specific record and deleting it using findById method */
        await Item.findByIdAndDelete(itemID)
        .then(() => {
            res.status(200).send({status: "Category Deleted"});
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with delete user", error: err.message});
        })
    })

  module.exports = router;