var mongoose = require('mongoose');

var AudioSchema = new mongoose.Schema({
    name: String,
    size:Number,
    updatetime: Date,
    category: Number,
    path: String,
    user: {
        id: String,
        name: String
    }
});

AudioSchema.static('getAudiosByUser', function (user, cb) {
    return this.find({
        user: user
    }, cb);
});

AudioSchema.static('getPubAudios', function (cb) {
    return this.find({}).exec(function (err, obj) {
        if(obj){
            obj = obj.filter(function (o) {
                return o.user.name === 'admin';
            });
        }
        cb(err, obj);
    });
});


var AudioModel = mongoose.model('Audio', AudioSchema);
module.exports = AudioModel;