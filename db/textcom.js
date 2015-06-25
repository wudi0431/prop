var mongoose = require('mongoose');


var TextComSchema = new mongoose.Schema({
    context: {type: String, default: '这里是文本'},
    textAlign: {type: String, default: 'left'},
    zIndex: {type:Number,default:1},
    top: {type: String, default: '200px'},
    left: {type: String, default: '100px'},
    right: {type: String, default: '0px'},
    bottom: {type: String, default: '0px'},
    width: {type: String, default: '110px'},
    height: {type: String, default: '25px'},
    backgroundColor: {type: String, default: 'transparent'},
    opacity: {type: String, default: '1'},
    transform: {type: String, default: 'rotate(0deg)'},
    borderColor: {type: String, default: 'rgb(255, 255, 255)'},
    borderWidth: {type: String, default: '0px'},
    borderStyle: {type: String, default: 'none'},
    borderRadius: {type: String, default: '0px;'},
    boxShadow:{type: String, default: '0px 0px 0px 0px rgb(221,221,221)'},
    textShadow:{type: String, default: '0px 0px 0px rgb(221,221,221)'},
    paddingTop: {type: String, default: '0px'},
    paddingLeft: {type: String, default: '0px'},
    paddingRight: {type: String, default: '0px'},
    paddingBottom: {type: String, default: '0px'},
    animationName: {type: String, default: 'none'},
    animationDuration: {type: String, default: '0s'},
    animationDelay: {type: String, default: '0s'},
    animationCount: {type: String, default: '1'},
    fontStyle: {type: String, default: 'normal'},
    fontWeight: {type: String, default: 'normal'},
    fontFamily: {type: String, default: 'Microsoft YaHei'},
    fontSize: {type: String, default: '16px'},
    color: {type: String, default: 'rgb(255, 255, 255)'},
    lineHeight: {type: String, default: '25px'},
    verticalAlign: {type: String, default: 'middle'},
    href: {type: String, default: "javascript:;"},
    hrefType: {type: String, default: ""},
    dataurl: {type: String, default: ""},
    datamapping: {type: String, default: ""},
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template'
    },
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

TextComSchema.static('getTextcomListByTemplateId', function (templateId, cb) {
    return this.find({
        template: templateId
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

var Page = require('./page');
