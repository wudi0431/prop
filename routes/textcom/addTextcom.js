var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
var Textcom = require('../../db/textcom');

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        req.body.user = req.session.user;
        var reqtext = req.body.textcom;

        reqtext.page = req.body.pageId;

        var textcom = new Textcom(reqtext);

        textcom.save(function (err, textcomEntity) {
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
                    model: textcomEntity
                });
            }
        });
    });
});

module.exports = router;