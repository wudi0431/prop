var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
/* GET home page. */
router.get('/', function (req, res) {
    filter.authorize(req, res,function(){
        res.redirect('/');
    });
});

module.exports = router;