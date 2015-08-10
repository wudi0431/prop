var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
var Audiocom = require('../../db/audiocom');

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        req.body.user = req.session.user;
        var reqtext = req.body.audiocom;
        reqtext.project = req.body.projectId;
        reqtext.audio = req.body.audioId;

        var audiocom = new Audiocom(reqtext);

        audiocom.save(function (err, audiocomEntity) {
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