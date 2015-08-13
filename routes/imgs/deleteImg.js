/**
 * Created by wudi on 15/8/7.
 */
var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
var Imgs = require('../../db/imgs');

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var imgId = req.body.imgId;
        Imgs.deleteImg(imgId,function (err, imgEntity) {
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
                        _id: imgEntity._id
                    }
                });
            }
        });
    });
});

module.exports = router;