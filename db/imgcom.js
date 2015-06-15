var mongoose = require('mongoose');

var ImgComSchema = new mongoose.Schema({
    zIndex:Number,
    top:{ type: String, default: '200px' },
    left:{ type: String, default: '100px' },
    right:String,
    bottom:String,
    width:{ type: String, default: '200px' },
    height:{ type: String, default: '150px' },
    opacity:String,
    transform:String,
    borderColor:String,
    borderWidth:String,
    borderStyle:String,
    borderRadius:String,
    boxShadowColor:String,
    boxShadowWidth:String,
    boxShadowBlur:String,
    boxShadowSize:String,
    boxShadowDegree:String,
    paddingTop:String,
    paddingLeft:String,
    paddingRight:String,
    paddingBottom:String,
    animationName:String,
    animationDuration:String,
    animationDelay:String,
    animationCount:String,
    verticalAlign:String,
    href:String,
    hrefType:String,
    dataurl:String,
    datamapping:String,
    imgurl:String,
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    }
});

ImgComSchema.static('deleteImgcom', function (imgcomId,cb) {
    return this.findByIdAndRemove(imgcomId, cb)
});

ImgComSchema.static('deleteImgcomByProject', function (pageId) {
    return this.find({
        page: pageId
    }).exec(function(err,imgcomList){
        if(imgcomList){
            imgcomList.forEach(function(imgcom){
                ImgComModel.deleteImgcom(imgcom._id);
            });

        }
    });
});

ImgComSchema.static('getImgcom', function (imgcomId,cb) {
    return this.findById(imgcomId, cb)
});

ImgComSchema.static('getImgcomListByPageId', function (pageId,cb) {
    return this.find({
        page: pageId
    }, cb)
});


ImgComSchema.static('updateImgcom', function (imgcom, cb) {
    var imgcomId = imgcom._id;
    delete imgcom._id;
    delete imgcom.__v;
    delete imgcom.page;
    return this.findOneAndUpdate({
        _id: imgcomId
    }, imgcom,{ 'new': true },cb)
});

var ImgComModel = mongoose.model('ImgCom', ImgComSchema);
module.exports = ImgComModel;