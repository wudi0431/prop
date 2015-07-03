var express = require('express');
var filter = require('../passport.js');
var router = express.Router();
var Imgs = require('../../db/imgs');
var fs = require('fs');
var path = require('path');
var os = require('os');
var config = require('../../config');
var domain = config.domain || getIpAddress(config.port);

function getIpAddress(port) {
    var ifaces = os.networkInterfaces();
    var ipAddress = 'localhost';
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details) {
            if (details.family == 'IPv4' && !details.internal) {
                ipAddress = details.address;
            }
        });
    }
    var link = 'http://' + ipAddress + ':' + port;
    return link;
}

router.post('/', function (req, res, next) {
    filter.authorize(req, res, function (req, res) {

        var isbase64 = req.body.isbase64 || false;

        req.body.user = req.session.user;
        var img = new Imgs();
        if (!isbase64) {
            img.name = req.files.codecsv.name;
            img.updatetime = new Date();
            img.path = domain + '/uploadimg/' + img.name;
            img.category = 1;
            img.user = req.session.user;

            img.save(function (err, imgEntity) {
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
                        model: imgEntity
                    });
                }
            });
        } else {
            //接收前台POST过来的base64
            var imgData = req.body.imgData;
            var dataBuffer = new Buffer(imgData, 'base64');
            var imgname = uuid(8, 16) + '.png';
            var imgpath = path.join(__dirname, '../../public/uploadimg/');
            fs.writeFile(imgpath + imgname, dataBuffer, function (err) {
                if (err) {
                    res.send(err);
                } else {
                    img.name = imgname;
                    img.updatetime = new Date();
                    img.path = domain + '/uploadimg/' + img.name;
                    img.category = 1;
                    img.user = req.session.user;
                    img.save(function (err, imgEntity) {
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
                                model: imgEntity
                            });
                        }
                    });

                }
            });
        }

    });
});


function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}


module.exports = router;