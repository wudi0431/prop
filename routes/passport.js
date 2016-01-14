var request = require('request');
var passport = {};
var os = require('os');


passport.getIP = function (port) {
    var self = this;

    self.ip = getIpAddress(port);
    return self.ip;

};


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


passport.authorize = function (req, res, next) {
    if (req.session.passportToken) {
        next(req, res);
    } else {
        res.redirect(passport.opt.passport + '/login?backUrl=' + passport.opt.backUrl + '/passportAuth');
    }
};


passport.init = function (router, opt) {
    passport.opt = opt;
    router.get('/passportAuth', function (req, res) {
        var code = req.query.code;
        request(passport.opt.passport + '/token', {
            method: 'POST',
            form: {code: code}
        }, function (re, rs, obj) {
          console.log(obj)
            obj = JSON.parse(obj);
            req.session.passportToken = obj.model.token;
            passport.login(req, res, function () {
                res.redirect(passport.opt.backUrl);
            });

        });
    });
};

passport.login = function (req, res, cb) {
    var passportToken = req.session.passportToken;
  console.log(passportToken)
  console.log(passport.opt.passport)
    request(passport.opt.passport+'/user', {
        method: 'GET',
        form: {token: passportToken}
    }, function (re, rs, obj) {
        console.log(obj)
        obj = JSON.parse(obj);
        if (obj.success) {
            if(obj.model.user.__v!=undefined){
                delete obj.model.user.__v;
            }
            req.session.user = obj.model.user;
            cb(obj);
        } else {
            req.session.passportToken = null;
            res.redirect(passport.opt.passport + '/login?backUrl=' + passport.opt.backUrl + '/passportAuth');
        }

    });
};

passport.logout = function (req, res, cb) {
    req.session.destroy(function (err) {
        if (err) {
            res.status(500).send({
                success: false,
                model: {
                    error: '注销失败'
                }
            });
        } else {
            res.status(200).send({
                success: true
            });
        }
    });
};


module.exports = passport;
