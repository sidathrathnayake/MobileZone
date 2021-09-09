const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


const ConnectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:true,

    });

    console.log('MongoDB Connected');

}

module.exports = ConnectDB;