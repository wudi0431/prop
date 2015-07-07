var express = require('express');
var router = express.Router();
var config = require('../config');
var request = require('request');


/* GET home page. */
router.get('/', function (req, res, next) {
    var dataurl = req.query.dataurl;
    var dataMethod = req.query.dataMethod || 'GET';
    var dataParams = req.query.dataParams || {};
    var headers = req.headers || {};
    if (dataurl) {
        request(dataurl, {
            method: dataMethod,
            form: dataParams,
            headers:headers
        }, function () {
            if (arguments.length == 3) {
                res.jsonp(arguments[2]);
            }else {
                res.jsonp(arguments[0].toString());
            }

        });
    } else {
        res.jsonp({});
    }
});


module.exports = router;