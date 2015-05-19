if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "logout",
    "desc": "用户注销",
    // 线上地址
    "url": "http://xxx/logout",
    // 日常地址
    "urlDaily": "http://xxxx/logout",
    // 预发地址
    "urlPrepub": "http://example.com/logout",
    // 支持的 Method 集合
    "method": ['GET']
};
exports.request = {};
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