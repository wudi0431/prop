var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var Btncom = require('../../db/btncom');

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        req.body.user = req.session.user;
        var reqtext = req.body.btncom;

        reqtext.page = req.body.pageId||null;

        var btncom = new Btncom(reqtext);

        btncom.save(function (err, btncomEntity) {
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
                    model: btncomEntity
                });
            }
        });
    });
});

module.exports = router;