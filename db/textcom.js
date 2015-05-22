var mongoose = require('mongoose');

var TextComSchema = new mongoose.Schema({
    context:String,
    texalign:String,
    zindex:Number,
    top:String,
    left:String,
    width:String,
    height:String,
    backgroundcolor:String,
    opcity:String,
    transform:String,
    bordercolo:String,
    borderwidth:String,
    borderstyle:String,
    borderradius:String,
    transformrotate:String,
    textshadowcolor:String,
    textshadowwidth:String,
    textshadowblur:String,
    textshadowdegree:String,
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
    lineheight:String,
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

TextComSchema.static('deleteTextcom', function (textcomId,cb) {
    return this.findByIdAndRemove(textcomId, cb)
});

TextComSchema.static('getTextcom', function (textcomId,cb) {
    return this.findById(textcomId, cb)
});

TextComSchema.static('getTextcomListByPageId', function (pageId,cb) {
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
    }, textcom,{ 'new': true },cb)
});


var TextComModel = mongoose.model('TextCom', TextComSchema);
module.exports = TextComModel;