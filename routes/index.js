var express = require('express');
var router = express.Router();
var filter = require('../filter/filter')
/* GET home page. */
router.get('/', function(req, res, next) {
    var username='登录',islogin=false;
    if(req.session.user){
        username = req.session.user.name;
        islogin=true;
    }
    res.render('index',{username:username,islogin:islogin});
});


//TODO 单元测试
router.get('/test', function(req, res, next) {
        res.render('test');
});

//TODO 编辑
router.get('/editor', function(req, res, next) {
    filter.authorize(req, res, function(req, res) {
        res.render('editor');
    });
});

//TODO 编辑
router.get('/list', function(req, res, next) {
    res.render('list');
});

module.exports = router;