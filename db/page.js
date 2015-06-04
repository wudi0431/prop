var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PageSchema = new Schema({
    name: String,
    sortindex: Number,//排序字段
    backgroundcolor: String,//页面背景
    backgroundimage: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});

PageSchema.static('deletePage', function (pageId, cb) {
    return this.findByIdAndRemove(pageId, cb)
});

PageSchema.static('getPage', function (pageId, cb) {
    return this.findById(pageId, cb)
});

PageSchema.static('getPageList', function (projectId, cb) {
    return this.find({
        project: projectId
    },null, {sort:{'sortindex':1}},cb);
});

PageSchema.static('updatePage', function (page, cb) {
    var pageId = page._id;
    delete page._id;
    delete page.__v;
    delete page.project;
    return this.findOneAndUpdate({
        _id: pageId
    }, page,{ 'new': true },cb)
});


var PageModel = mongoose.model('Page', PageSchema);
module.exports = PageModel;