var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var CreateHtml = require('../../db/view');
/* post home page. */
router.post('/', function(req, res, next) {
    filter.authorize(req, res, function(req, res) {
      
    	  var postdata  = req.body;

        var createHtml = new CreateHtml();
             createHtml.url= postdata.url;
             createHtml.uid= req.session.user._id;
             createHtml.project=postdata.projectid;


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