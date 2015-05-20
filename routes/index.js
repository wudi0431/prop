var express = require('express');
var router = express.Router();
var filter = require('../filter/filter')
/* GET home page. */
router.get('/', function(req, res, next) {
    filter.authorize(req, res, function(req, res) {
        res.render('index');
    })
});


//TODO 单元测试
router.get('/test', function(req, res, next) {
        res.render('test');
});


module.exports = router;