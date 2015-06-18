var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TemplateSchema = new Schema({
    name: String,
    backgroundcolor: String,//页面背景
    backgroundimage: String,
    category: Number,
    imgUrl: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


TemplateSchema.static('addTplByUser', function (pageId, user, imgUrl, cb) {
    return Page.getPage(pageId, function (err, pageEntity) {
        if (pageEntity) {
            var tplEntity = mixObject(pageEntity);

            tplEntity.user = user;
            tplEntity.imgUrl = imgUrl;

            var tpl = new TemplateModel(tplEntity);
            tpl.save(function (err, templateEntity) {
                cb(err, templateEntity);
                if (templateEntity) {
                    Btncom.getBtncomListByPageId(pageId, function (err, btncomList) {
                        if (btncomList) {
                            btncomList.forEach(function (btncomEntity) {
                                var newBtncomEntity = mixObject(btncomEntity);
                                newBtncomEntity.template = templateEntity._id;
                                var newBtncom = new Btncom(newBtncomEntity);
                                newBtncom.save();
                            });
                        }
                    });

                    Textcom.getTextcomListByPageId(pageId, function (err, textcomList) {
                        if (textcomList) {
                            textcomList.forEach(function (textcomEntity) {
                                var newTextcomEntity = mixObject(textcomEntity);
                                newTextcomEntity.template = templateEntity._id;
                                var newTextcom = new Textcom(newTextcomEntity);
                                newTextcom.save();
                            });
                        }
                    });


                    Imgcom.getImgcomListByPageId(pageId, function (err, imgcomList) {
                        if (imgcomList) {
                            imgcomList.forEach(function (imgcomEntity) {
                                var newImgcomEntity = mixObject(imgcomEntity);
                                newImgcomEntity.template = templateEntity._id;
                                var newImgcom = new Imgcom(newImgcomEntity);
                                newImgcom.save();
                            });
                        }
                    });

                }
            });

        }
    });
});

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


TemplateSchema.static('getPubTpl', function (cb) {
    return this.find({}).populate({
        path: 'user',
        select: 'name'
    }).exec(function (err, templateList) {

        if (templateList) {
            templateList = templateList.filter(function (o) {
                return o.user.name === 'admin';
            });
            if (templateList.length > 0) {
                getCom(templateList, cb);
            } else {
                cb(err, templateList);
            }

        }

    });
});

TemplateSchema.static('getTplByUser', function (user, cb) {
    return this.find({
        user: user
    }).exec(function (err, templateList) {
        if (templateList) {
            getCom(templateList, cb);
        }
    });
});


function getCom(data, cb) {
    var allTpl = [];
    data.forEach(function (o) {
        var oneTpl = o;
        //Btncom
        Btncom.getBtncomListByTemplateId(o._id, function (err, btncomList) {

            if (err) {

                return;
            }
            if (btncomList) {
                oneTpl.btncomtList = btncomList;
            }

            //Imgcom
            Imgcom.getImgcomListByTemplateId(o._id, function (err, imgcomList) {
                if (err) {

                    return;
                }
                if (imgcomList) {
                    oneTpl.imgcomList = imgcomList;
                }
                //Textcom
                Textcom.getTextcomListByTemplateId(o._id, function (err, textcomList) {
                    if (err) {

                        return;
                    }
                    if (textcomList) {
                        oneTpl.textcomList = textcomList;
                    }

                    var newTpl = mixObject(oneTpl);
                    newTpl.uid = oneTpl.id;
                    allTpl.push(newTpl);
                    if (allTpl.length === data.length) {
                        cb(err, allTpl);
                    }

                });
                //Textcom End
            });
            //Imgcom End

        });
        //Btncom End

    });
}


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


TemplateSchema.static('generationPage', function (projectId, allData, cb) {
    allData.project = projectId;
    var newPage = new Page(allData);
    return newPage.save(function (err, pageEntity) {
        if (allData.btncomtList) {
            allData.btncomtList.forEach(function (o) {
                delete o._id;
                delete o.__v;
                delete o.template;
                delete o.page;
                o.page = pageEntity;
                new Btncom(o).save();
            });
        }

        if (allData.imgcomList) {
            allData.imgcomList.forEach(function (o) {
                delete o._id;
                delete o.__v;
                delete o.template;
                delete o.page;
                o.page = pageEntity;
                new Imgcom(o).save();
            });
        }

        if (allData.textcomList) {
            allData.textcomList.forEach(function (o) {
                delete o._id;
                delete o.__v;
                delete o.template;
                delete o.page;
                o.page = pageEntity;
                new Textcom(o).save();
            });
        }
        cb(err, pageEntity);
    });
});


var TemplateModel = mongoose.model('Template', TemplateSchema);
module.exports = TemplateModel;

var Page = require('./page');
var Btncom = require('./btncom');
var Textcom = require('./textcom');
var Imgcom = require('./imgcom');
