var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var Textcom = require('../../db/textcom');
router.get('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var pageId = req.query.pageId;
        Textcom.getTextcomListByPageId(pageId, function (err, textcomtList) {
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
                        textcomtList: textcomtList
                    }
                });
            }
        });


    });

});


module.exports = router;