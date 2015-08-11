var mongoose = require('mongoose');


var ImgComSchema = new mongoose.Schema({
    zIndex: {type: Number, default: 1},
    top: {type: String, default: '200px'},
    left: {type: String, default: '100px'},
    right: {type: String, default: '0px'},
    bottom: {type: String, default: '0px'},
    width: {type: String, default: '200px'},
    height: {type: String, default: '150px'},
    opacity: {type: String, default: '1'},
    transform: {type: String, default: 'rotate(0deg)'},
    borderColor: {type: String, default: '#ffffff'},
    borderWidth: {type: String, default: '4px'},
    borderStyle: {type: String, default: 'none'},
    borderRadius: {type: String, default: '0px'},
    boxShadow:{type: String, default: '0px 0px 0px 0px rgb(221,221,221)'},
    paddingTop: {type: String, default: '0px'},
    paddingLeft: {type: String, default: '0px'},
    paddingRight: {type: String, default: '0px'},
    paddingBottom: {type: String, default: '0px'},
    animationName: {type: String, default: 'none'},
    animationDuration: {type: String, default: '1.3s'},
    animationDelay: {type: String, default: '0s'},
    animationCount: {type: String, default: '1'},
    verticalAlign: {type: String, default: 'middle'},
    href: {type: String, default: ""},
    hrefType: {type: String, default: ""},
    dataurl: {type: String, default: ""},
    datamapping: {type: String, default: ""},
    imgurl: {type: String, default: ""},
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template'
    },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    }
});

ImgComSchema.static('deleteImgcom', function (imgcomId, cb) {
    return this.findByIdAndRemove(imgcomId, function (err, imgcomEntity) {
        if(imgcomEntity){
            Page.updateProjectTime(imgcomEntity.page);
        }
        if (cb) {
            cb(err, imgcomEntity);
        }
    })
});

ImgComSchema.static('deleteImgcomByProject', function (pageId) {
    return this.find({
        page: pageId
    }).exec(function (err, imgcomList) {
        if (imgcomList) {
            imgcomList.forEach(function (imgcom) {
                ImgComModel.deleteImgcom(imgcom._id);
            });

        }
    });
});

ImgComSchema.static('deleteImgcomByTemplate', function (templateId) {
    return this.find({
        template: templateId
    }).exec(function (err, imgcomList) {
        if (imgcomList) {
            imgcomList.forEach(function (imgcom) {
                ImgComModel.deleteImgcom(imgcom._id);
            });

        }
    });
});


ImgComSchema.static('getImgcom', function (imgcomId, cb) {
    return this.findById(imgcomId, cb)
});

ImgComSchema.static('getImgcomListByPageId', function (pageId, cb) {
    return this.find({
        page: pageId
    }, cb)
});

ImgComSchema.static('getImgcomListByTemplateId', function (templateId, cb) {
    return this.find({
        template: templateId
    }, cb)
});

ImgComSchema.static('copyItem', function (imgcomId, pageId, cb) {
    return this.findById(imgcomId, function (err, imgcomEntity) {
        if (imgcomEntity) {
            imgcomEntity = mixObject(imgcomEntity);
            imgcomEntity.page = pageId;
            new ImgComModel(imgcomEntity).save(cb);
        }
    });
});


ImgComSchema.static('updateImgcom', function (imgcom, cb) {
    var imgcomId = imgcom._id;
    delete imgcom._id;
    delete imgcom.__v;
    delete imgcom.page;
    return this.findOneAndUpdate({
        _id: imgcomId
    }, imgcom, {'new': true}, function (err, imgcomEntity) {
        if(imgcomEntity) {
            Page.updateProjectTime(imgcomEntity.page);
        }
        if (cb) {
            cb(err, imgcomEntity);
        }
    })
});

function type(o) {
    var TYPES = {
        'undefined': 'undefined',
        'number': 'number',
        'boolean': 'boolean',
        'string': 'string',
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Function]': 'function',
        '[object RegExp]': 'regexp',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object Error]': 'error'
    };

    var TOSTRING = Object.prototype.toString;
    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
}

function mixObject(obj) {
    var tmpObj = {};
    for (var key in obj) {
        if (type(obj[key]) == 'string' || type(obj[key]) == 'number' || type(obj[key]) == 'array') {
            tmpObj[key] = obj[key];
        }
    }
    delete tmpObj.id;
    delete tmpObj.__v;
    return tmpObj;
}

var ImgComModel = mongoose.model('ImgCom', ImgComSchema);
module.exports = ImgComModel;

var Page = require('./page');
