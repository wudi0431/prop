var filter = {};
var User = require('../db/user');
filter.authorize = function(req, res, next) {
    if (req.session.user) {
        return next(req, res);
    }
    req.flash('error', '未登录!');
    res.redirect('/login');
};
filter.login = function(req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    User.checkUser(name, password, function(err, user) {
        console.log(err, user);
        if (err) {
            res.send(500, {
                success: false,
                model: {
                    error: '数据库错误'
                }
            });
        } else {
            if (user) {
                req.session.user = user;
                res.send(200, {
                    success: true
                });
            } else {
                res.send(500, {
                    success: false,
                    model: {
                        error: '用户已存在'
                    }
                });
            }
        }
    });
};
filter.logout = function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            res.send(500, {
                success: false,
                model: {
                    error: '注销失败'
                }
            });
        } else {
            res.send(200, {
                success: true
            });
        }
    });
};
module.exports = filter;