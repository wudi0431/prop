var mongoose = require('mongoose');

var ImgsSchema = new mongoose.Schema({
    name: String,
    updatetime: Date,
    category: Number,//1:全部，2：背景，3：元素，4：表情，5：文字
    state: {type: Number, default:1},//1:显示，2:用户删除，3：物理删除
    path: String,
    user: {
        id: String,
        name: String
    }
});

ImgsSchema.static('getImgsByUser', function (user, cb) {
    return this.find({
        user: user,
        state:1
    }, cb);
});

ImgsSchema.static('getPubImgs', function (category,cb) {
    if(category==1){
        return this.find({state:1}).exec(function (err, obj) {
            if(obj){
                obj = obj.filter(function (o) {
                    return o.user.name === 'admin';
                });
            }
            cb(err, obj);
        });
    }else{
        return this.find({category:category}).exec(function (err, obj) {
            if(obj){
                obj = obj.filter(function (o) {
                    return o.user.name === 'admin';
                });
            }
            cb(err, obj);
        });
    }

});

ImgsSchema.static('deleteImg', function (imgid, cb) {
    return this.findOneAndUpdate({
        _id: imgid
    }, {state:2}, null,function (err, AudiocomEntity) {
        if (cb) {
            cb(err, AudiocomEntity);
        }
    })
});

var ImgsModel = mongoose.model('Imgs', ImgsSchema);
module.exports = ImgsModel;