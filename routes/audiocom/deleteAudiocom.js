var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
var Audiocom = require('../../db/audiocom');

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var audiocomId = req.body.audiocomId;
        Audiocom.deleteAudiocom(audiocomId,function (err, audiocomEntity) {
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
                        _id: audiocomId
                    }
                });
            }
        });
    });
});

module.exports = router;