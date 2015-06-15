var mongoose = require('mongoose');
var Page = require('./page');

var BtnComSchema = new mongoose.Schema({
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
    fontSize: String,
    color: String,
    lineHeight: {type: String, default: '25px'},
    verticalAlign: String,
    href: String,
    hrefType: String,
    dataurl: String,
    datamapping: String,
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