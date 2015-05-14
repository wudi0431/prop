var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    name: String,
    password: String
});
UserSchema.static('checkUser', function(name, password, cb) {
    return this.findOne({
        name: name,
        password: password
    }, cb)
});
var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;