const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin123@ds119442.mlab.com:19442/todolist',{ useNewUrlParser: true },error =>{
    !error ? console.log('connected to database') : console.log('Error in database connection' + error);
});

module.exports = mongoose;