var mongoose = require('mongoose');

var BtnComSchema = new mongoose.Schema({
    context:String,
    texalign:String,
    zindex:Number,
    top:String,
    left:String,
    right:String,
    bottom:String,
    width:{ type: String, default: '110px' },
    height:{ type: String, default: '25px' },
    backgroundcolor:String,
    opcity:String,
    transform:String,
    bordercolo:String,
    borderwidth:String,
    borderstyle:String,
    borderradius:String,
    boxshadowcolor:String,
    boxshadowwidth:String,
    boxshadowblur:String,
    boxshadowsize:String,
    boxshadowdegree:String,
    paddingtop:String,
    paddingleft:String,
    paddingright:String,
    paddingbottom:String,
    animationname:String,
    animationduration:String,
    animationdelay:String,
    animationcount:String,
    fontstyle:String,
    fontweight:String,
    fontfamily:String,
    fontsize:String,
    color:String,
    lineheight:{ type: String, default: '25px' },
    verticalalign:String,
    href:String,
    hreftype:String,
    dataurl:String,
    datamapping:String,
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    }
});

BtnComSchema.static('deleteBtncom', function (btncomId,cb) {
    return this.findByIdAndRemove(btncomId, cb);
});

BtnComSchema.static('getBtncom', function (btncomId,cb) {
    return this.findById(btncomId, cb);
});

BtnComSchema.static('getBtncomListByPageId', function (pageId,cb) {
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
    }, btncom,{ 'new': true },cb);
});

var BtnComModel = mongoose.model('BtnCom', BtnComSchema);
module.exports = BtnComModel;