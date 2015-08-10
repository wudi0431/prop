var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
var Audiocom = require('../../db/audiocom');



router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var audiocom = req.body;
        Audiocom.updateAudiocom(audiocom, function (err, audiocomEntity) {
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
                    model: audiocomEntity
                });
            }
        });
    });
});

module.exports = router;