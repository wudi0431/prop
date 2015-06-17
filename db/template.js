var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TemplateSchema = new Schema({
    name: String,
    backgroundcolor: String,//页面背景
    backgroundimage: String,
    category: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


TemplateSchema.static('addTplByUser', function (pageId, user, cb) {
    return Page.getPage(pageId, function (err, pageEntity) {
        if (pageEntity) {
            pageEntity.user = user;
            var tpl = new TemplateModel(pageEntity);
            tpl.save(cb);
        }
    });
});


var TemplateModel = mongoose.model('Template', TemplateSchema);
module.exports = TemplateModel;

var Page = require('./page');
var Btncom = require('./btncom');
var Textcom = require('./textcom');
var Imgcom = require('./imgcom');
