var express = require('express');
var router = express.Router();
var filter = require('../filter/filter');
var Page = require('../db/page');
var Btncom = require('../db/btncom');
var Imgcom = require('../db/imgcom');
var Textcom = require('../db/textcom');

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
                    var onePage = {};
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

                                    res.render('preview', {allPage:allPage});
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


module.exports = router;