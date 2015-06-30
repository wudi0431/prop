var express = require('express');
var router = express.Router();
var filter = require('../../filter/filter')
/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});
router.post('/', function (req, res, next) {
    filter.login(req, res, next);
});
module.exports = router;