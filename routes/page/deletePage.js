var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
var Page = require('../../db/page');
/* GET home page. */


router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var pageId = req.body.pageId;
        Page.deletePage(pageId,function (err, projectEntity) {
            if (err) {
                res.status('500');
                res.send({
                    success: false, // 标记失败
                    model: {
                        error: '系统错误'
                    }
                });
            } else {
                res.status('200');
                res.send({
                    success: true
                });
            }
        });
    });
});

module.exports = router;