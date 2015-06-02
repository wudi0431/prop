var express = require('express');
var filter = require('../../filter/filter');
var router = express.Router();
var Imgs = require('../../db/imgs');
router.post('/', function(req, res, next) {
    filter.authorize(req, res, function (req, res) {
        req.body.user = req.session.user;
        var img = new Imgs();
            img.name=req.files.codecsv.name;
            img.updatetime=new Date();
            img.path=req.files.codecsv.path;
            img.category=1;
            img.user=req.session.user;
        img.save(function (err,imgEntity) {
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
                    model: imgEntity
                });
            }
        });
    });
});




module.exports = router;