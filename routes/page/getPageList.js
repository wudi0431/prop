var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var Page = require('../../db/page');
/* GET home page. */
router.get('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var projectId = req.query.projectId;
        Page.getPageList(projectId, function (err, pageList) {
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
                    success: true,
                    model: {
                        pageList: pageList
                    }
                });
            }
        });


    });

});


module.exports = router;