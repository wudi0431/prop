var mongoose = require('mongoose');

var ViewSchema = new mongoose.Schema({
    url:String,
    uid:String,//是否生成预览页的指纹
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});


var ViewModel = mongoose.model('View', ViewSchema);
module.exports = ViewModel;