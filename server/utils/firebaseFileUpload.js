const firebase = require('firebase/app').default;
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
const firebaseConfig = {
    apiKey: "AIzaSyCU0Kf1YE-bRZ3U-EkqKwyirJoNfm7dfFQ",
    authDomain: "mobilezone-f2a79.firebaseapp.com",
    projectId: "mobilezone-f2a79",
    storageBucket: "mobilezone-f2a79.appspot.com",
    messagingSenderId: "857494176111",
    appId: "1:857494176111:web:adbd742b1bbf18e061289a",
    measurementId: "G-6RCL2VXJ58"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
module.exports = storage;