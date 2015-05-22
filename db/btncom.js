var mongoose = require('mongoose');

var BtnComSchema = new mongoose.Schema({
    context:String,
    texalign:String,
    zindex:Number,
    top:String,
    left:String,
    width:String,
    height:String,
    background:String,
    opcity:String,
    route:String,
    border:String,
    textshadow:String,
    boxshadow:String,
    padding:String,
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
    borderradius:String,
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