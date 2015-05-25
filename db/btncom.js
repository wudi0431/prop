var mongoose = require('mongoose');

var BtnComSchema = new mongoose.Schema({
    context:String,
    texalign:String,
    zindex:Number,
    top:String,
    left:String,
    right:String,
    bottom:String,
    width:String,
    height:String,
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

BtnComSchema.static('deleteBtncom', function (btncomId,cb) {
    return this.findByIdAndRemove(btncomId, cb);
});

var BtnComModel = mongoose.model('BtnCom', BtnComSchema);
module.exports = BtnComModel;