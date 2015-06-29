var mongoose = require('mongoose');


var BtnComSchema = new mongoose.Schema({
    context: {type: String, default: '按钮'},
    textAlign: {type: String, default: 'center'},
    zIndex: {type:Number,default:1},
    top: {type: String, default: '200px'},
    left: {type: String, default: '100px'},
    right: {type: String, default: '0px'},
    bottom: {type: String, default: '0px'},
    width: {type: String, default: '110px'},
    height: {type: String, default: '25px'},
    backgroundColor: {type: String, default: 'rgb(68,199,103)'},
    opacity: {type: String, default: '1'},
    transform: {type: String, default: 'rotate(0deg)'},
    borderColor: {type: String, default: 'rgb(24,171,41)'},
    borderWidth: {type: String, default: '1px'},
    borderStyle: {type: String, default: 'solid'},
    borderRadius: {type: String, default: '20px;'},
    boxShadow:{type: String, default: '0px 0px 0px 0px rgb(221,221,221)'},
    textShadow:{type: String, default: '0px 0px 0px rgb(221,221,221)'},
    paddingTop: {type: String, default: '0px'},
    paddingLeft: {type: String, default: '0px'},
    paddingRight: {type: String, default: '0px'},
    paddingBottom: {type: String, default: '0px'},
    animationName: {type: String, default: 'none'},
    animationDuration: {type: String, default: '1.3s'},
    animationDelay: {type: String, default: '0s'},
    animationCount: {type: String, default: '1'},
    fontStyle: {type: String, default: 'normal'},
    fontWeight: {type: String, default: 'bold'},
    fontFamily: {type: String, default: 'Microsoft YaHei'},
    fontSize: {type: String, default: '16px'},
    textDecoration: {type: String, default: 'none'},
    color: {type: String, default: 'rgb(255,255,255)'},
    lineHeight: {type: String, default: '25px'},
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

BtnComSchema.static('deleteBtncom', function (btncomId, cb) {
    return this.findByIdAndRemove(btncomId, function (err, btncom) {
        Page.updateProjectTime(btncom.page);
        if (cb) {
            cb(err, btncom);
        }
    });
});

BtnComSchema.static('deleteBtncomByProject', function (pageId) {
    return this.find({
        page: pageId
    }).exec(function (err, btncomList) {
        if (btncomList) {
            btncomList.forEach(function (btncom) {
                BtnComModel.deleteBtncom(btncom._id);
            });

        }
    });
});


BtnComSchema.static('getBtncom', function (btncomId, cb) {
    return this.findById(btncomId, cb);
});

BtnComSchema.static('getBtncomListByPageId', function (pageId, cb) {
    return this.find({
        page: pageId
    }, cb);
});

BtnComSchema.static('getBtncomListByTemplateId', function (templateId, cb) {
    return this.find({
        template: templateId
    }, cb);
});


BtnComSchema.static('updateBtncom', function (btncom, cb) {
    var btncomId = btncom._id;
    delete btncom._id;
    delete btncom.__v;
    delete btncom.page;
    return this.findOneAndUpdate({
        _id: btncomId
    }, btncom, {'new': true}, function (err, btncomEntity) {
        Page.updateProjectTime(btncomEntity.page);
        if (cb) {
            cb(err, btncomEntity);
        }
    });
});

var BtnComModel = mongoose.model('BtnCom', BtnComSchema);
module.exports = BtnComModel;

var Page = require('./page');

