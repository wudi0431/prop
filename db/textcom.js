var mongoose = require('mongoose');
var Page = require('./page');

var TextComSchema = new mongoose.Schema({
    context: String,
    textAlign: String,
    zIndex: Number,
    top: {type: String, default: '200px'},
    left: {type: String, default: '100px'},
    right: String,
    bottom: String,
    width: {type: String, default: '110px'},
    height: {type: String, default: '25px'},
    backgroundColor: String,
    opacity: String,
    transform: String,
    borderColor: String,
    borderWidth: String,
    borderStyle: String,
    borderRadius: String,
    boxShadowColor: String,
    boxShadowWidth: String,
    boxShadowBlur: String,
    boxShadowSize: String,
    boxShadowDegree: String,
    paddingTop: String,
    paddingLeft: String,
    paddingRight: String,
    paddingBottom: String,
    animationName: String,
    animationDuration: String,
    animationDelay: String,
    animationCount: String,
    fontStyle: String,
    fontWeight: String,
    fontFamily: String,
    fontSize: {type: String, default: '24px'},
    color: {type: String, default: '#ffffff'},
    lineHeight: {type: String, default: '25px'},
    verticalAlign: String,
    href: String,
    hrefType: String,
    dataurl: String,
    datamapping: String,
    transformRotate: String,
    textShadowColor: String,
    textShadowWidth: String,
    textShadowBlur: String,
    textShadowDegree: String,
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    }
});

TextComSchema.static('deleteTextcom', function (textcomId, cb) {
    return this.findByIdAndRemove(textcomId, function (err, textcom) {
        Page.updateProjectTime(textcom.page);
        if (cb) {
            cb(err, textcom);
        }
    })
});


TextComSchema.static('deleteTextcomByProject', function (pageId) {
    return this.find({
        page: pageId
    }).exec(function (err, textcomList) {
        if (textcomList) {
            textcomList.forEach(function (textcom) {
                TextComModel.deleteTextcom(textcom._id);
            });

        }
    });
});

TextComSchema.static('getTextcom', function (textcomId, cb) {
    return this.findById(textcomId, cb)
});

TextComSchema.static('getTextcomListByPageId', function (pageId, cb) {
    return this.find({
        page: pageId
    }, cb)
});


TextComSchema.static('updateTextcom', function (textcom, cb) {
    var textcomId = textcom._id;
    delete textcom._id;
    delete textcom.__v;
    delete textcom.page;
    return this.findOneAndUpdate({
        _id: textcomId
    }, textcom, {'new': true}, function (err, textcomEntity) {
        Page.updateProjectTime(textcomEntity.page);
        if (cb) {
            cb(err, textcomEntity);
        }
    });
});


var TextComModel = mongoose.model('TextCom', TextComSchema);
module.exports = TextComModel;