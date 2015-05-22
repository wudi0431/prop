var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var Imgcom = require('../../db/imgcom');
/* GET home page. */
router.get('/', function (req, res, next) {
    var imgcomId = req.query.imgcomId;
    filter.authorize(req, res, function (req, res) {
        Imgcom.getTextcom(imgcomId, function (err, imgcomEntity) {
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
                    model: imgcomEntity
                });
            }
        });
    });
});


module.exports = router;