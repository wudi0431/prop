var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new mongoose.Schema({
    name: String,
    password:String
});


UserSchema.static('findByName', function(name, cb) {
    return this.findOne({
        name: name
    }, cb)
});



var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;