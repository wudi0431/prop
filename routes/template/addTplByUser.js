var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var Template = require('../../db/template');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/');
});

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var pageId = req.body.pageId;
        Template.addTplByUser(pageId, req.session.user, function (err, tplEntity) {
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