var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
var CreateHtml = require('../../db/view');

router.post('/', function(req, res, next) {
    filter.authorize(req, res, function(req, res) {
        var createHtml = new CreateHtml(req.body);
            createHtml.uid= req.session.user.id;
        createHtml.save(function (err, createHtmlEntity) {
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
                    model: createHtmlEntity
                });
            }
        });
    });
});


module.exports = router;