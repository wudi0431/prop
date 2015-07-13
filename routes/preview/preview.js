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


/* GET home page. */
router.get('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var projectId = req.query.projectId;
        res.render('preview', {previewSrc: config.previewDomain+'/index.html?projectId=' + projectId});
    });
});




/* GET home page. */
router.get('/jsonp', function (req, res, next) {
    var projectId = req.query.projectId;
    var allPage = [];
    Page.getPageList(projectId, function (err, pageList) {
        if (err || !pageList.length) {
            res.jsonp({
                success: false,
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
                                res.jsonp({
                                    success: true,
                                    model: allPage
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