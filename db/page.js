var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Btncom = require('./btncom');
var Textcom = require('./textcom');
var Imgcom = require('./imgcom');

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
    return this.findByIdAndRemove(pageId).exec(function (err, page) {
        if (page) {
            Btncom.deleteBtncomByProject(page._id);
            Textcom.deleteTextcomByProject(page._id);
            Imgcom.deleteImgcomByProject(page._id);
        }
    });
});

PageSchema.static('deletePageByProject', function (projectId) {
    return this.find({
        project: projectId
    }).exec(function (err, pageList) {
        if (pageList) {
            pageList.forEach(function (page) {
                PageModel.deletePage(page._id);
            });

        }
    });
});


PageSchema.static('getPage', function (pageId, cb) {
    return this.findById(pageId, cb)
});

PageSchema.static('getPageList', function (projectId, cb) {
    return this.find({
        project: projectId
    }, null, {sort: {'sortindex': 1}}, cb);
});

PageSchema.static('updatePage', function (page, cb) {
    var pageId = page._id;
    delete page._id;
    delete page.__v;
    delete page.project;
    return this.findOneAndUpdate({
        _id: pageId
    }, page, {'new': true}, cb)
});


var PageModel = mongoose.model('Page', PageSchema);
module.exports = PageModel;