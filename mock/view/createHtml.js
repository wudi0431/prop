if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "createHtml",
    "desc": "生成预览页",
    // 线上地址
    "url": "http://xxx/createHtml",
    // 日常地址
    "urlDaily": "http://xxxx/createHtml",
    // 预发地址
    "urlPrepub": "http://example.com/createHtml",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = {
    "projectid": "132"
};
exports.response = {
    "success": true, // 标记成功
    "model": ViewSchema
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};