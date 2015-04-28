var express = require('express');
var router = express.Router();
var Fontmin = require('fontmin');
var path = require('path');
var os = require('os');
var fs = require('fs');
 
function mkdirSync(url,mode,cb){
    var path = require("path"), arr = url.split("/");
    mode = mode || 0755;
    cb = cb || function(){};
    if(arr[0]==="."){//处理 ./aaa
        arr.shift();
    }
    if(arr[0] == ".."){//处理 ../ddd/d
        arr.splice(0,2,arr[0]+"/"+arr[1])
    }
    function inner(cur){
        if(!path.existsSync(cur)){//不存在就创建一个
            fs.mkdirSync(cur, mode)
        }
        if(arr.length){
            inner(cur + "/"+arr.shift());
        }else{
            cb();
        }
    }
    arr.length && inner(arr.shift());
}
    



/* GET home page. */
router.get('/', function(req, res, next) {});

router.post('/', function(req, res, next) {

    var fontname =req.body.fontname;
    var srcPath = path.resolve(__dirname, '../public/fonts/'+fontname+'.ttf');

    mkdirSync('../public/temp/'+fontname+'',0,function(e){
        if(e){
            console.log('出错了');
        }else{
            console.log("创建成功")
        }
    });


    var destPath = path.resolve(__dirname, '../public/temp/'+fontname+'');



    var text = req.body.text;
    var fontmin = new Fontmin()
        .src(srcPath);
    fontmin.use(Fontmin.glyph({
        text: text
    })).use(Fontmin.ttf2eot({
        clone: true
    })).use(Fontmin.ttf2woff({
        clone: true
    })).use(Fontmin.ttf2svg({
        clone: true
    })).dest(destPath);

    fontmin.run(function(err, files, stream) {

        if (err) {
            console.log(err);
            process.exit(-1);
        }

        var paths = [];
        files.forEach(function(file) {
            paths.push('/' + file.path.split('/public/')[1]);
        });

        var data = {
            text: text,
            fontname:fontname,
            paths: paths,
            destPath:destPath
        };

        res.render('fontShow', data);
    });


});

module.exports = router;