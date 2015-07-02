var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
var Btncom = require('../../db/btncom');
/* GET home page. */
router.get('/', function (req, res, next) {
    var btncomId = req.query.btncomId;
    filter.authorize(req, res, function (req, res) {
        Btncom.getBtncom(btncomId, function (err, btncomEntity) {
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
                    model: btncomEntity
                });
            }
        });
    });
});


module.exports = router;