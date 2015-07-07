var express = require('express');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var router = express.Router();
var config = require('../../config');
var filter = require('../passport.js');
var Project = require('../../db/project');
var Page = require('../../db/page');
var Btncom = require('../../db/btncom');
var Imgcom = require('../../db/imgcom');
var Textcom = require('../../db/textcom');
var View = require('../../db/view');
var previewPath = path.resolve(__dirname, '../../public/preview');
var previewTPL = path.resolve(__dirname, 'preview.html');

/* GET home page. */
router.get('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var projectId = req.query.projectId;
        var allPage = [];
        Page.getPageList(projectId, function (err, pageList) {

            if (err) {
                return;
            }

            if (pageList) {
                pageList.forEach(function (o) {
                    var onePage = o;
                    //Btncom
                    Btncom.getBtncomListByPageId(o._id, function (err, btncomList) {

                        if (err) {

                            return;
                        }
                        if (btncomList) {
                            onePage.btncomtList = btncomList;
                        }

                        //Imgcom
                        Imgcom.getImgcomListByPageId(o._id, function (err, imgcomList) {
                            if (err) {

                                return;
                            }
                            if (imgcomList) {
                                onePage.imgcomList = imgcomList;
                            }
                            //Textcom
                            Textcom.getTextcomListByPageId(o._id, function (err, textcomList) {
                                if (err) {

                                    return;
                                }
                                if (textcomList) {
                                    onePage.textcomList = textcomList;
                                }

                                allPage.push(onePage);
                                if (allPage.length === pageList.length) {
                                    Project.getProject(projectId, function (err, projectEntity) {
                                        if (err) {
                                            return;
                                        }

                                        if (projectEntity) {
                                            createHTML(projectEntity.updatetime.getTime(), projectId, allPage, res);
                                        }
                                    });
                                }
                            });
                            //Textcom End
                        });
                        //Imgcom End

                    });
                    //Btncom End

                });
            }


        });


    })
});

function createHTML(uid, projectId, allPage, res) {
    var str = fs.readFileSync(previewTPL, {encoding: 'UTF-8'});

    allPage.sort(function (a, b) {
        if (a.sortindex > b.sortindex) {
            return 1;
        } else {
            return -1;
        }
    });
    var html = ejs.render(str, {allPage: allPage});
    var isExists = fs.existsSync(previewPath);
    var previewSrc = '';

    if (!isExists) {
        fs.mkdirSync(previewPath);
    }

    View.getView(uid, function (err, view) {
        if (err) {
            return;
        }

        if (view) {
            previewSrc = view.url;
            if (view.uid != uid) {
                previewSrc = writeHTML();
            }
        } else {
            previewSrc = writeHTML();
        }
        res.render('preview', {previewSrc: config.domain+'/wx/index.html?projectId='+projectId});
    });

    function writeHTML() {
        var newPreviewPath = path.join(previewPath, projectId + '');
        if (!fs.existsSync(newPreviewPath)) {
            fs.mkdirSync(newPreviewPath);
        }
        fs.writeFileSync(path.join(newPreviewPath, 'index.html'), html);
        var view = new View({
            url: path.join(path.sep, 'preview', projectId + '', 'index.html'),
            uid: uid,
            project: projectId
        });
        view.save();
        return path.join(path.sep, 'preview', projectId + '', 'index.html');
    }


}


/* GET home page. */
router.get('/jsonp', function (req, res, next) {
    var projectId = req.query.projectId;
    var allPage = [];
    Page.getPageList(projectId, function (err, pageList) {
        if (err || !pageList.length) {
            res.status('404');
            res.send({
                success: false, // 标记失败
                model: {
                    error: '系统错误'
                }
            });
            return;
        }

        if (pageList) {
            pageList.forEach(function (o) {
                var onePage = mixObject(o);
                onePage.btncomtList = [];
                onePage.imgcomList = [];
                onePage.textcomList = [];

                //Btncom
                Btncom.getBtncomListByPageId(o._id, function (err, btncomList) {


                    if (btncomList) {
                        onePage.btncomtList = btncomList;
                    }

                    //Imgcom
                    Imgcom.getImgcomListByPageId(o._id, function (err, imgcomList) {

                        if (imgcomList) {
                            onePage.imgcomList = imgcomList;
                        }
                        //Textcom
                        Textcom.getTextcomListByPageId(o._id, function (err, textcomList) {

                            if (textcomList) {
                                onePage.textcomList = textcomList;
                            }

                            allPage.push(onePage);
                            if (allPage.length === pageList.length) {
                                allPage.sort(function (a, b) {
                                    if (a.sortindex > b.sortindex) {
                                        return 1;
                                    } else {
                                        return -1;
                                    }
                                });
                                res.status('200');
                                res.jsonp(allPage);
                            }
                        });
                        //Textcom End
                    });
                    //Imgcom End

                });
                //Btncom End

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
    return tmpObj;
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

module.exports = router;