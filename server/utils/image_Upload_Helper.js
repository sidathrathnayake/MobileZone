const multer = require('multer');
const fs = require('fs');
const path = require('path');

//import x from '../../client/public/itemImages'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/itemImages');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g,'-')+file.originalname);
    }
})

function fileFilter (req, file, cb) {
    if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null,true);
    }else {
        // To accept the file pass `true`, like so:
        cb(new Error("only allow image uploads"));
    }
}

const upload = multer({storage: storage,fileFilter:fileFilter});

module.exports = {upload};