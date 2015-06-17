var mongoose = require('mongoose');

var TemplateSchema = new mongoose.Schema({
    name: String,
    backgroundcolor: String,//页面背景
    backgroundimage: String,
    category: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


var TemplateModel = mongoose.model('Template', TemplateSchema);
module.exports = TemplateModel;