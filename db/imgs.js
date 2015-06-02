var mongoose = require('mongoose');

var ImgsSchema = new mongoose.Schema({
    name:String,
    updatetime:Date,
    category:Number,
    path:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

ImgsSchema.static('getImgsByUser', function (userId,cb) {
    return this.find({
        user: userId
    }, cb)
});

ImgsSchema.static('getPubImgs', function (userId,cb) {
    return this.find({}, cb)
});


var ImgsModel = mongoose.model('Imgs', ImgsSchema);
module.exports = ImgsModel;