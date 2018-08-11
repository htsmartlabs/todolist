const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const user = require('./routes/user.controller');

const app = express();

//adding middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//home route
app.get('/',(req,res,next)=>{
    res.json({message:"Welcome to my home page"});
});

app.use('/user',user);

app.use((error,req,res,next)=>{
    res.json({status: false,message: "Error: "+error});
});

app.listen(3000,()=>{
    console.log('server started');
});