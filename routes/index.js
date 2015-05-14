var express = require('express');
var router = express.Router();
var filter = require('../filter/filter')
/* GET home page. */
router.get('/', function(req, res, next) {
    filter.authorize(req, res, function(req, res) {
        res.render('index');
    })
});
module.exports = router;