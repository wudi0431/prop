if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "deleteTplUser",
    "desc": "删除单个模板",
    // 线上地址
    "url": "http://xxx/deleteTplUser",
    // 日常地址
    "urlDaily": "http://xxxx/deleteTplUser",
    // 预发地址
    "urlPrepub": "http://example.com/deleteTplUser",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = {
    id:"2332323df"
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