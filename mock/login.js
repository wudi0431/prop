if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "login",
    "desc": "用户登录",
    // 线上地址
    "url": "http://xxx/login",
    // 日常地址
    "urlDaily": "http://xxxx/login",
    // 预发地址
    "urlPrepub": "http://example.com/login",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = {
    "name": "admin", // 用户名 
    "password": "admin" //密码
};
exports.response = {
    "success": true, // 标记成功
    "model": {}
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};