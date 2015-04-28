var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path'); 

router.post('/', function(req, res){

	console.log(req.files);

  	res.end('');
});
 

module.exports = router;