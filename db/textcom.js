var mongoose = require('mongoose');

var TextComSchema = new mongoose.Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Page'
    }
});


var TextComModel = mongoose.model('TextCom', TextComSchema);
module.exports = TextComModel;