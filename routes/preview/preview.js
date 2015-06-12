var express = require('express');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var router = express.Router();
var filter = require('../../filter/filter');
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
        var previewSrc = '';
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
        res.render('preview', {previewSrc: previewSrc})
    });

    function writeHTML() {
        var newPreviewPath = path.join(previewPath, uid + '');
        fs.mkdirSync(newPreviewPath);
        fs.writeFileSync(path.join(newPreviewPath, 'index.html'), html);
        var view = new View({
            url: path.join(path.sep, 'preview', uid + '', 'index.html'),
            uid: uid,
            project: projectId
        });
        view.save();
        return path.join(path.sep, 'preview', uid + '', 'index.html');
    }


}


module.exports = router;