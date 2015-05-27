var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var Btncom = require('../../db/btncom');
router.get('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var pageId = req.body.pageId;
        Btncom.getBtncomListByPageId(pageId, function (err, btncomtList) {
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
                        btncomtList: btncomtList
                    }
                });
            }
        });


    });

});


module.exports = router;