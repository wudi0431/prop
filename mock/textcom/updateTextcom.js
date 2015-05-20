if (typeof exports === 'undefined') {
    exports = {};
}
exports.config = {
    "name": "updateTextcom",
    "desc": "更新文本组件",
    // 线上地址
    "url": "http://xxx/updateTextcom",
    // 日常地址
    "urlDaily": "http://xxxx/updateTextcom",
    // 预发地址
    "urlPrepub": "http://example.com/updateTextcom",
    // 支持的 Method 集合
    "method": ['POST']
};
exports.request = TextcomSchema;
exports.response = {
    "success": true, // 标记成功
    "model":TextcomSchema //db的Textcom表
};
exports.responseError = {
    "success": false, // 标记失败
    "model": {
        "error": "Error message"
    }
};