var express = require('express');
var router = express.Router();
var filter = require('./../passport.js');
var Wexinshare = require('../../db/wexinshare');

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var wexinsharedata = req.body.wexinshare;
        wexinsharedata.project = req.body.projectId;
        Wexinshare.deleteWeiXinShareByProjectId(req.body.shareid,function (err, dwexinshareEntity) {
              console.log(dwexinshareEntity)
            if (err) {
                res.status('500');
                res.send({
                    success: false, // 标记失败
                    model: {
                        error: '系统错误'
                    }
                });
            } else {
                console.log('11111')
                var newWexinsharedata = new Wexinshare(wexinsharedata);
                newWexinsharedata.save(function (err, wexinshareEntity) {
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

            }
        });


    });
});

module.exports = router;