var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
var Template = require('../../db/template');
/* GET home page. */


router.get('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        Template.getTplByUser(req.session.user, function (err, templateList) {
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
                    TemplateList: templateList
                });
            }
        });

    });
});

module.exports = router;