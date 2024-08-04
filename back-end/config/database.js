const mongoose = require('mongoose');

const connectDataBase = () => {

    mongoose.connect('mongodb://localhost:27017/API')
    .then(
        console.log('DB CONNECTED')
    )
    .catch((error)=>{console.log(error.message)})
};

module.exports = connectDataBase;