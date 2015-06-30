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
        if (err) {
            res.status(500).send({
                success: false,
                model: {
                    error: '数据库错误'
                }
            });
        } else {
            if (user) {
                req.session.user = user;
                 res.status(200).send({
                     success: true
                 });
                //res.redirect('/index');
            } else {
                res.status(500).send({
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
module.exports = filter;