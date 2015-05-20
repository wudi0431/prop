var express = require('express');
var router = express.Router();
var Imgs = require('../../db/imgs');
router.get('/', function(req, res, next) {
    Imgs.find(req.session.user._id,function(err,imgs){
        console.log(imgs);
        res.send({'success':true,ImgsList:[imgs]});
    });
});

module.exports = router;