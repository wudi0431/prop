var mongoose = require('mongoose');

var ImgsSchema = new mongoose.Schema({
    name: String,
    updatetime: Date,
    category: Number,
    path: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

ImgsSchema.static('getImgsByUser', function (userId, cb) {
    return this.find({
        user: userId
    }, cb);
});

ImgsSchema.static('getPubImgs', function (cb) {
    return this.find({}).populate({
        path: 'user',
        select: 'name'
    }).exec(function (err, obj) {
        if(obj){
            obj = obj.filter(function (o) {
                return o.user.name === 'admin';
            });
        }
        cb(err, obj);
    });
});


var ImgsModel = mongoose.model('Imgs', ImgsSchema);
module.exports = ImgsModel;