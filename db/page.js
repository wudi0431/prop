var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PageSchema = new Schema({
    name: String,
    sortindex: Number,//排序字段
    background: String,//页面背景
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});


var PageModel = mongoose.model('Page', PageSchema);
module.exports = PageModel;