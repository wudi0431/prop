var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var Textcom = require('../../db/textcom');

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var textcomId = req.body.textcomId;
        Textcom.deleteTextcom(textcomId,function (err, textcomEntity) {
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
                        _id: textcomId
                    }
                });
            }
        });
    });
});

module.exports = router;