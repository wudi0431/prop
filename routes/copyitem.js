var express = require('express');
var router = express.Router();
var filter = require('./passport.js');
var Page = require('../db/page');

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var itemId = req.body.itemId;
        var type = req.body.type;
        var pageId = req.body.pageId;

        Page.copyItem(itemId, type, pageId,function (err, itemEntity) {
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
                    model: itemEntity
                });
            }
        });
    });
});


module.exports = router;