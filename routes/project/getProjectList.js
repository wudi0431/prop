var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
var Project = require('../../db/project');
/* GET home page. */
router.get('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {
        var user = req.session.user;
        Project.getProjectList(user, function (err, projectList) {
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
                    model: {
                        projectList: projectList
                    }
                });
            }
        });


    });

});


router.get('/jsonp', function (req, res) {
    var userId = req.query.userId;
    var userName = req.query.userName;
    Project.getProjectList({
        id: userId,
        name: userName
    }, function (err, projectList) {
        if (err) {
            res.jsonp({
                success: false,
                model: {
                    error: '系统错误'
                }
            });
        } else {
            res.jsonp({
                success: true,
                model: projectList
            });
        }
    });

});


module.exports = router;
