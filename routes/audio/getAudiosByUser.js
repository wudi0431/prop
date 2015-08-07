var express = require('express');
var router = express.Router();
var Audio = require('../../db/audio');
var filter = require('../passport.js');
router.get('/', function(req, res, next) {
    var user =  req.session.user;
    filter.authorize(req, res, function (req, res) {
        Audio.getAudiosByUser(user,function (err, audioEntity) {
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
                    model: {audioList: audioEntity}
                });
            }
        });
    });

});

module.exports = router;