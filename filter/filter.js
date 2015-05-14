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
    User.findByName('admin',function(err, user) {
        console.log(err, user);
        if (err) {
            res.status('404');
            res.end('数据库错误');
        } else {
            req.session.user = user;
            res.send('登录成功');
        }
    });
};
filter.logout = function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.send('注销');
        }
    });
};
module.exports = filter;