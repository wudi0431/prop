var mongoose = require('mongoose');

var ImgComSchema = new mongoose.Schema({
    imgurl:String,
    zindex:Number,
    top:String,
    left:String,
    width:String,
    height:String,
    opcity:String,
    route:String,
    border:String,
    boxshadow:String,
    padding:String,
    animationname:String,
    animationduration:String,
    animationdelay:String,
    animationcount:String,
    verticalalign:String,
    href:String,
    hreftype:String,
    dataurl:String,
    datamapping:String,
    page: {
        type: Schema.Types.ObjectId,
        ref: 'Page'
    }
});


var ImgComModel = mongoose.model('ImgCom', ImgComSchema);
module.exports = ImgComModel;