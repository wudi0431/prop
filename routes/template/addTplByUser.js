var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter');
var Template = require('../../db/template');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/');
});

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {

        res.status('200');
        res.send({
            success: true
        });

    });
});

module.exports = router;