var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var Imgcom = require('../../db/imgcom');

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var imgcomId = req.body.imgcomId;
        Imgcom.deleteImgcom(imgcomId,function (err, imgcomEntity) {
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
                        _id: imgcomId
                    }
                });
            }
        });
    });
});

module.exports = router;