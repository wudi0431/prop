var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var Project = require('../../db/project');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/');
});

router.post('/', function (req, res, next) {
    var project = new Project(req.body);

    project.save(function(err,projectEntity){
        if(err){
            res.status('500');
            res.send({
                success: false, // 标记失败
                model: {
                    error: '系统错误'
                }
            });
        }else{
            res.status('200');
            res.send(projectEntity);
        }
    });

});

module.exports = router;