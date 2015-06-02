var express = require('express');
var router = express.Router();
var Imgs = require('../../db/imgs');
var filter = require('../../filter/filter');
router.get('/', function(req, res, next) {
    filter.authorize(req, res, function (req, res) {
        Imgs.getPubImgs(function (err, imgsEntity) {
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
                    model: imgsEntity
                });
            }
        });
    });

});

module.exports = router;