var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var filter = require('../../filter/filter');
var Template = require('../../db/template');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/');
});

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var allData = req.body.allData;

        Template.generationPage(allData,function (err, pageEntity) {
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
                    model:pageEntity
                });
            }
        });

    });
});



module.exports = router;