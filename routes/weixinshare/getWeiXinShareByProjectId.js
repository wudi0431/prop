var express = require('express');
var router = express.Router();
var filter = require('./../passport.js');
var Wexinshare = require('../../db/wexinshare');

router.get('/', function (req, res, next) {
    var projectId = req.query.projectId;

    filter.authorize(req, res, function (req, res) {
        Wexinshare.getWeiXinShareByProjectId(projectId, function (err, wexinshareEntity) {
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
                    model: wexinshareEntity
                });
            }
        });
    });
});

module.exports = router;