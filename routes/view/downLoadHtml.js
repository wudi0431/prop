var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var DownLoadHtml = require('../../db/view');

router.get('/', function(req, res, next) {
    filter.authorize(req, res, function(req, res) {
        var downLoadHtml = new DownLoadHtml();
            downLoadHtml.uid= req.session.user._id;
            downLoadHtml.url= req.query.url;

        downLoadHtml.save(function (err, downLoadHtmlEntity) {
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
                    model: downLoadHtmlEntity
                });
            }
        });
    });
});


module.exports = router;