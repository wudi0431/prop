var express = require('express');
var router = express.Router();
var filter = require('./../passport.js');
var Wexinshare = require('../../db/wexinshare');

router.get('/', function (req, res, next) {
    var projectId = req.query.projectId;
    Wexinshare.getWeiXinShareByProjectId(projectId, function (err, wexinshareEntity) {
        if (err) {
            res.jsonp({
                success: false,
                model: {
                    error: '系统错误'
                }
            });
        } else {
            res.jsonp({
                success: true,
                model: wexinshareEntity
            });
        }
    });
});

module.exports = router;