var express = require('express');
var router = express.Router();
var Imgs = require('../../db/imgs');
router.post('/', function(req, res, next) {


    res.send(req.files)
});




module.exports = router;