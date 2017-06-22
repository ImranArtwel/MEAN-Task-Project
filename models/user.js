/**
 * Created by artwe on 12/06/2017.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

//user schema
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//export the user for the schema
const User = module.exports = mongoose.model('User',userSchema);

//find user by id..exporting this method
module.exports.getUserById = (id,callback) => {
    User.findById(id,callback);
}

//find user by username
module.exports.getUserByUsername =(username,callback) => {
    const query = {username: username};
    User.findOne(query,callback);
}

module.exports.addUser = (newUser, callback) => {
   bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password,salt,(err, hash) => {
     if(err) throw  err;
     newUser.password = hash;
     newUser.save(callback);
    })
   })
}


module.exports.comparePassword = function (userPass, hash, callback){
    bcrypt.compare(userPass, hash, function (err, isMatch) {
        if(err) throw err;
        callback(null,isMatch);
    })
}
