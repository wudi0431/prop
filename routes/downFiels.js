 var express = require('express');
var router = express.Router();
var fs = require('fs'); 
var archiver = require('archiver');
var path = require('path');
var ejs = require('ejs');

router.get('/', function(req, res, next) {

	var _fontname = req.query.fontname;
	
	var _fonttext = req.query.fonttext;

	var fontspath = path.resolve(__dirname, '../public/temp/' + _fontname + '/' + _fontname + '');

	var demopath = path.resolve(__dirname, '../views/');
	
	var output = fs.createWriteStream('../public/temp/'+_fontname+'/'+_fontname+'.zip'); 

	var archive = archiver('zip');

	archive.on('error', function(err) {
		res.status(500).send({
			error: err.message
		});
	});

	//on stream closed we can end the request
	res.on('close', function() {
		console.log('Archive wrote %d bytes', archive.pointer());
		return res.status(200).send('OK').end();
	});

	//set the archive name
	res.attachment(_fontname+'.zip');

	//this is the streaming magic
	archive.pipe(res);





    var str = fs.readFileSync(demopath+'/demo.html', 'utf8');


    var ret = ejs.render(str, {
        fontext: _fonttext,
        fontname:_fontname
    });
	



	var file1 = fontspath+".eot";
	var file2 = fontspath+".svg";
	var file3 = fontspath+".ttf";
	var file4 = fontspath+".woff";
	var file5 = demopath+'/demo.html';


	archive
	.append(fs.createReadStream(file1), { name: _fontname+'.eot' })
	.append(fs.createReadStream(file2), { name: _fontname+'.svg' })
	.append(fs.createReadStream(file3), { name: _fontname+'.ttf' })
	.append(fs.createReadStream(file4), { name: _fontname+'.woff' })
	.append(ret, { name: 'demo.html'})
	.finalize(); 
	console.log(_fonttext);
 
 

});

module.exports = router;