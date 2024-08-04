const express = require('express');
const connectDataBase = require('./config/database');
const auth = require('./routes/auth')
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();

connectDataBase();
dotenv.config({path : path.join(__dirname,'config','config.env')});

app.use(express.json());
app.use(cookieParser());


app.use('/user',auth)


app.listen(process.env.PORT,() => {
    console.log(`server listening on ${process.env.PORT}`)
})


