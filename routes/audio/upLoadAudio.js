var express = require('express');
var filter = require('../passport.js');
var router = express.Router();
var Audio = require('../../db/audio');
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
        var audio = new Audio();
        audio.name = req.files.codecsv.name;
        audio.updatetime = new Date();
        audio.path = domain + '/uploadimg/' + audio.name;
        audio.category = 1;
        audio.user = req.session.user;
        audio.save(function (err, audioEntity) {
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
                    model: audioEntity
                });
            }
        });


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