 var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var fontspath = path.resolve(__dirname, '../public/fonts');
 

router.get('/', function(req, res, next) {
	fs.readdir(fontspath, function(err, files){
    //err 为错误 , files 文件名列表包含文件夹与文件
    if(err){
        console.log('error:\n' + err);
        return;
    }else{ 
 		 res.send(files);
    }

});  

}); 

module.exports = router;