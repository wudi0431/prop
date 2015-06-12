var mongoose = require('mongoose');

var ViewSchema = new mongoose.Schema({
    url:String,
    uid:String,//是否生成预览页的指纹
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
});


ViewSchema.static('getView', function (uid,cb) {
    return this.findOne({
        uid:uid
    }, cb)
});

var ViewModel = mongoose.model('View', ViewSchema);
module.exports = ViewModel;