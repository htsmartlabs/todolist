const mongoose = require('../config/database.config');

const userSchema = mongoose.Schema({
    name: { type: String, require : true},
    email: { type: String, require : true, unique: true},
    password: { type: String, require : true},
    pin: {type: Number, require : true, unique: true, min: 4 , max: 4},
    kids:[{
        _id: false,
        name:{type: String},
        total:{type: Number, default: 0},
        days:[{
            _id:false,
            date:{type: Date, default: Date.now},
            tasks:[{
                _id: false,
                name:{type: String},
                score:{type: Number, default: 0, min : 0, max: 100},
                complete:{type: Boolean, default: false}
            }]    
        }]
    }]
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;