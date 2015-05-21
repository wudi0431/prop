var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var Textcom = require('../../db/textcom');
/* GET home page. */
router.get('/', function (req, res, next) {
    var textcomId = req.query.textcomId;
    filter.authorize(req, res, function (req, res) {
        Textcom.getTextcom(textcomId, function (err, textcomEntity) {
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
                    model: textcomEntity
                });
            }
        });
    });
});


module.exports = router;